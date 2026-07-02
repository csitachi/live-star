#!/usr/bin/env python3
"""
Architecture Diagram Generator
Automated tool for senior architect tasks
"""

import os
import sys
import json
import argparse
from pathlib import Path
from typing import Dict, List, Optional

class ArchitectureDiagramGenerator:
    """Main class for architecture diagram generator functionality"""
    
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
        """Scan project directory structure to generate a Mermaid architecture diagram"""
        print("🔍 Analyzing project layout for diagram generation...")
        structure = []
        for root, dirs, files in os.walk(self.target_path):
            dirs[:] = [d for d in dirs if not d.startswith('.') and d not in ('node_modules', 'dist', 'build', '.next', 'out')]
            for name in dirs:
                structure.append(os.path.relpath(os.path.join(root, name), self.target_path))
        self.results["structure"] = structure

    def generate_report(self):
        """Generate architecture diagram using Mermaid format"""
        print("📊 Generating architecture diagram...")
        mermaid = ["graph TD"]
        structure = self.results.get("structure", [])
        
        if any(s.startswith("src") for s in structure):
            mermaid.append("  subgraph src [Source Directory]")
            for s in structure:
                if s.startswith("src/"):
                    parts = s.split("/")
                    if len(parts) == 2:
                        mermaid.append(f"    src_{parts[1]}[{parts[1]}]")
            mermaid.append("  end")
        
        if "prisma" in structure:
            mermaid.append("  prisma[Prisma DB Schema] --> src")
        if "public" in structure:
            mermaid.append("  public[Public Assets]")
            
        diagram = "\n".join(mermaid)
        self.results["diagram"] = diagram
        print("\nGenerated Mermaid Diagram:")
        print(diagram)
        print()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Architecture Diagram Generator")
    parser.add_argument("target_path", nargs="?", default=".", help="Path to project directory")
    parser.add_argument("-v", "--verbose", action="store_true", help="Verbose output")
    args = parser.parse_args()
    
    generator = ArchitectureDiagramGenerator(args.target_path, args.verbose)
    generator.run()
