#!/usr/bin/env python3
"""
Project Architect
Automated tool for senior architect tasks
"""

import os
import sys
import json
import argparse
from pathlib import Path
from typing import Dict, List, Optional

class ProjectArchitect:
    """Main class for project architect functionality"""
    
    def __init__(self, target_path: str, verbose: bool = False):
        self.target_path = Path(target_path)
        self.verbose = verbose
        self.results = {}
    
    def run(self) -> Dict:
        """Execute the main functionality"""
        print(f"🚀 Running {self.__class__.__name__}...")
        print(f"📁 Target: {self.target_path}")
        
        try:
            self.validate_target()
            self.analyze()
            self.generate_report()
            
            print("✅ Completed successfully!")
            return self.results
            
        except Exception as e:
            print(f"❌ Error: {e}")
            sys.exit(1)
    
    def validate_target(self):
        """Validate the target path exists and is accessible"""
        if not self.target_path.exists():
            raise FileNotFoundError(f"Target path does not exist: {self.target_path}")

    def analyze(self):
        """Analyze project codebase architecture patterns, checking layout rules"""
        print("🔍 Checking project architecture layout...")
        issues = []
        
        pkg_file = self.target_path / "package.json"
        if pkg_file.exists():
            with open(pkg_file, "r") as f:
                data = json.load(f)
                deps = data.get("dependencies", {})
                is_next = "next" in deps
                
                if is_next:
                    next_config = self.target_path / "next.config.js"
                    next_config_ts = self.target_path / "next.config.ts"
                    next_config_mjs = self.target_path / "next.config.mjs"
                    if not (next_config.exists() or next_config_ts.exists() or next_config_mjs.exists()):
                        issues.append("Missing next.config file in a Next.js project")
                        
        self.results["issues"] = issues

    def generate_report(self):
        """Generate analysis report of architectural suggestions"""
        print("📊 Generating project architect report...")
        issues = self.results.get("issues", [])
        if not issues:
            print("✨ Architecture check: No structural issues found!")
        else:
            print("⚠️ Architecture Suggestions/Issues:")
            for issue in issues:
                print(f"  - {issue}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Project Architect")
    parser.add_argument("target_path", nargs="?", default=".", help="Path to project directory")
    parser.add_argument("-v", "--verbose", action="store_true", help="Verbose output")
    args = parser.parse_args()
    
    analyzer = ProjectArchitect(args.target_path, args.verbose)
    analyzer.run()
