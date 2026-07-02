import React, { useState, useRef } from 'react';
import styles from './ProfileFeed.module.css';

interface CreatePostCardProps {
  onPostCreated: (newPost: any) => void;
}

export default function CreatePostCard({ onPostCreated }: CreatePostCardProps) {
  const [content, setContent] = useState('');
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'PHOTO' | 'VIDEO' | 'STATUS'>('STATUS');
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Xử lý chọn tệp tin
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit: 50MB
    if (file.size > 50 * 1024 * 1024) {
      alert('Tệp tin vượt quá dung lượng giới hạn 50MB!');
      return;
    }

    setMediaFile(file);
    const type = file.type.startsWith('video/') ? 'VIDEO' : 'PHOTO';
    setMediaType(type);

    // Tạo object URL để preview
    const previewUrl = URL.createObjectURL(file);
    setMediaPreview(previewUrl);
  };

  const removeMedia = () => {
    setMediaFile(null);
    setMediaPreview(null);
    setMediaType('STATUS');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Upload tệp tin lên server (hỗ trợ progress tracking bằng XMLHttpRequest)
  const uploadFile = (file: File, uploadUrl: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', uploadUrl, true);
      
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(percentComplete);
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            resolve(response.url);
          } catch (err) {
            reject(new Error('Lỗi phân tích phản hồi upload!'));
          }
        } else {
          reject(new Error(`Lỗi upload: ${xhr.statusText}`));
        }
      };

      xhr.onerror = () => reject(new Error('Lỗi mạng khi upload tệp!'));
      
      // Send raw file data
      xhr.send(file);
    });
  };

  // Submit bài đăng
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && !mediaFile) return;

    setLoading(true);
    setUploadProgress(null);

    try {
      let finalMediaUrl = '';

      if (mediaFile) {
        // Bước 1: Lấy URL upload
        const resUrl = await fetch(
          `/api/posts/presigned-url?filename=${encodeURIComponent(mediaFile.name)}&fileType=${encodeURIComponent(mediaFile.type)}`
        );
        const urlData = await resUrl.json();

        if (!resUrl.ok || !urlData.success) {
          throw new Error(urlData.error || 'Không thể lấy URL upload!');
        }

        const { uploadUrl, fileUrl } = urlData.data;

        // Bước 2: Upload trực tiếp (Mock hoặc R2)
        setUploadProgress(0);
        await uploadFile(mediaFile, uploadUrl);
        finalMediaUrl = fileUrl;
      }

      // Bước 3: Tạo bài viết mới
      const resPost = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          type: mediaType,
          mediaUrl: finalMediaUrl || undefined,
        }),
      });

      const postData = await resPost.json();
      if (!resPost.ok || !postData.success) {
        throw new Error(postData.error || 'Đăng bài viết thất bại!');
      }

      // 4. Reset Form và callback
      setContent('');
      removeMedia();
      onPostCreated(postData.data);
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Có lỗi xảy ra khi đăng bài!');
    } finally {
      setLoading(false);
      setUploadProgress(null);
    }
  };

  return (
    <div className={`${styles.card} ${styles.createCard}`}>
      <h3 className={styles.createTitle}>✨ Chia sẻ cảm nghĩ của bạn</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <textarea
          className={styles.textarea}
          placeholder="Hôm nay bạn thế nào? Hãy viết gì đó giao lưu cùng fans nhé..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={loading}
        />

        {mediaPreview && (
          <div className={styles.previewContainer}>
            {mediaType === 'VIDEO' ? (
              <video src={mediaPreview} controls className={styles.previewVideo} />
            ) : (
              <img src={mediaPreview} alt="Preview" className={styles.previewImg} />
            )}
            <button
              type="button"
              className={styles.removePreviewBtn}
              onClick={removeMedia}
              disabled={loading}
            >
              ✕
            </button>
          </div>
        )}

        {uploadProgress !== null && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div className={styles.progressBarContainer}>
              <div className={styles.progressBar} style={{ width: `${uploadProgress}%` }} />
            </div>
            <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', textAlign: 'right' }}>
              Đang tải lên: {uploadProgress}%
            </span>
          </div>
        )}

        <div className={styles.toolbar}>
          <div className={styles.mediaButtons}>
            <input
              type="file"
              ref={fileInputRef}
              className={styles.fileInput}
              accept="image/*,video/*"
              onChange={handleFileChange}
              disabled={loading}
            />
            <button
              type="button"
              className={styles.attachBtn}
              onClick={() => fileInputRef.current?.click()}
              disabled={loading}
            >
              🖼️ Thêm Ảnh / Video
            </button>
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={loading || (!content.trim() && !mediaFile)}
          >
            {loading ? 'Đang đăng...' : 'Đăng bài 🚀'}
          </button>
        </div>
      </form>
    </div>
  );
}
