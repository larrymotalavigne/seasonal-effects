#!/bin/bash
set -e

echo "🎬 Creating demo.mp4..."

# Create assets directory if it doesn't exist
mkdir -p /home/user/seasonal-effects/assets

# Generate demo video with ffmpeg
ffmpeg -y \
  -f lavfi -i color=c=0x1a1a2e:s=1920x1080:d=15 \
  -vf "
    drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:\
text='@seasonal-effects/angular':\
fontcolor=white:fontsize=80:x=(w-text_w)/2:y=150:\
enable='between(t,0,15)',\
    drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf:\
text='Production-ready Angular library for seasonal effects':\
fontcolor=0xaaaaaa:fontsize=36:x=(w-text_w)/2:y=250:\
enable='between(t,1,15)',\
    drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:\
text='✨ Features':\
fontcolor=0x4CAF50:fontsize=48:x=150:y=350:\
enable='between(t,2,15)',\
    drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf:\
text='🌍 Hemisphere-Aware Season Detection':\
fontcolor=white:fontsize=32:x=150:y=430:\
enable='between(t,3,15)',\
    drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf:\
text='🎆 Built-in Holiday Registry (40+ countries)':\
fontcolor=white:fontsize=32:x=150:y=480:\
enable='between(t,4,15)',\
    drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf:\
text='🎨 Multiple Effects: Snow, Fireworks, Petals, Confetti, Leaves':\
fontcolor=white:fontsize=32:x=150:y=530:\
enable='between(t,5,15)',\
    drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf:\
text='🚀 SSR-Safe with Angular Universal Support':\
fontcolor=white:fontsize=32:x=150:y=580:\
enable='between(t,6,15)',\
    drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf:\
text='⚡ Performant Canvas Rendering (60fps)':\
fontcolor=white:fontsize=32:x=150:y=630:\
enable='between(t,7,15)',\
    drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf:\
text='♿ Respects prefers-reduced-motion':\
fontcolor=white:fontsize=32:x=150:y=680:\
enable='between(t,8,15)',\
    drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:\
text='Quick Start':\
fontcolor=0x2196F3:fontsize=48:x=150:y=780:\
enable='between(t,9,15)',\
    drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuMono.ttf:\
text='npm install @seasonal-effects/angular':\
fontcolor=0x00ff00:fontsize=28:x=150:y=860:\
enable='between(t,10,15)',\
    drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf:\
text='github.com/larrymotalavigne/seasonal-effects':\
fontcolor=0xaaaaaa:fontsize=28:x=(w-text_w)/2:y=980:\
enable='between(t,12,15)'
  " \
  -c:v libx264 -pix_fmt yuv420p -r 30 \
  /home/user/seasonal-effects/assets/demo.mp4

echo "✅ Demo video created: assets/demo.mp4"

# Check file size
ls -lh /home/user/seasonal-effects/assets/demo.mp4
