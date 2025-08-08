# Prismic Sample Data for Testing

## 1. Collection Sample Data

### Collection 1: Outdoor Sculpture Park

- **UID**: outdoor-sculpture-park
- **Slug ID**: outdoor-sculpture-park
- **Title**: Outdoor Sculpture Park
- **Description**: A collection of outdoor sculptures and installations in the park
- **Contents**: [Link to content items below]

### Collection 2: Indoor Gallery

- **UID**: indoor-gallery
- **Slug ID**: indoor-gallery
- **Title**: Indoor Gallery
- **Description**: Contemporary art pieces displayed in indoor gallery spaces
- **Contents**: [Link to content items below]

### Collection 3: Public Art Walk

- **UID**: public-art-walk
- **Slug ID**: public-art-walk
- **Title**: Public Art Walk
- **Description**: Interactive art installations along the public walking path
- **Contents**: [Link to content items below]

## 2. Content Item Sample Data

### Content Item 1: "Breathing Guidance"

- **UID**: breathing-guidance
- **Name**: Breathing Guidance
- **Sub Name**: Interactive Installation
- **Thumb**: [Upload image: sculpture-1.jpg]
- **Material**: Bronze and Steel
- **Detail**: [Link to detail below]

### Content Item 2: "Harmony in Motion"

- **UID**: harmony-in-motion
- **Name**: Harmony in Motion
- **Sub Name**: Kinetic Sculpture
- **Thumb**: [Upload image: sculpture-2.jpg]
- **Material**: Stainless Steel
- **Detail**: [Link to detail below]

### Content Item 3: "Eternal Flow"

- **UID**: eternal-flow
- **Name**: Eternal Flow
- **Sub Name**: Water Feature
- **Thumb**: [Upload image: sculpture-3.jpg]
- **Material**: Granite and Water
- **Detail**: [Link to detail below]

### Content Item 4: "Urban Reflection"

- **UID**: urban-reflection
- **Name**: Urban Reflection
- **Sub Name**: Mirror Installation
- **Thumb**: [Upload image: sculpture-4.jpg]
- **Material**: Mirrored Glass
- **Detail**: [Link to detail below]

### Content Item 5: "Nature's Voice"

- **UID**: natures-voice
- **Name**: Nature's Voice
- **Sub Name**: Sound Installation
- **Thumb**: [Upload image: sculpture-5.jpg]
- **Material**: Wood and Metal
- **Detail**: [Link to detail below]

## 3. Detail Sample Data

### Detail 1: "Breathing Guidance" Details

- **UID**: breathing-guidance-detail
- **Title**: Breathing Guidance - Interactive Art Installation
- **Description**: An interactive sculpture that responds to human presence and breathing patterns. The piece creates a meditative experience through light and sound elements.
- **Info**: Created in 2023, this piece explores the relationship between human consciousness and environmental awareness.
- **Author**: Artist Name
- **Images**:
  - [Upload: breathing-guidance-1.jpg]
  - [Upload: breathing-guidance-2.jpg]
  - [Upload: breathing-guidance-3.jpg]

### Detail 2: "Harmony in Motion" Details

- **UID**: harmony-motion-detail
- **Title**: Harmony in Motion - Kinetic Art
- **Description**: A dynamic sculpture that moves with the wind, creating harmonious patterns and reflections of light throughout the day.
- **Info**: This kinetic piece demonstrates the beauty of natural forces and human engineering working together.
- **Author**: Artist Name
- **Images**:
  - [Upload: harmony-motion-1.jpg]
  - [Upload: harmony-motion-2.jpg]

### Detail 3: "Eternal Flow" Details

- **UID**: eternal-flow-detail
- **Title**: Eternal Flow - Water Sculpture
- **Description**: A flowing water feature that symbolizes the eternal cycle of life and the constant movement of time.
- **Info**: The water element creates a calming atmosphere and attracts local wildlife to the area.
- **Author**: Artist Name
- **Images**:
  - [Upload: eternal-flow-1.jpg]
  - [Upload: eternal-flow-2.jpg]
  - [Upload: eternal-flow-3.jpg]

### Detail 4: "Urban Reflection" Details

- **UID**: urban-reflection-detail
- **Title**: Urban Reflection - Mirror Art
- **Description**: A series of strategically placed mirrors that reflect the urban environment in unexpected ways, creating new perspectives of the city.
- **Info**: This installation challenges viewers to see their surroundings from different angles and perspectives.
- **Author**: Artist Name
- **Images**:
  - [Upload: urban-reflection-1.jpg]
  - [Upload: urban-reflection-2.jpg]

### Detail 5: "Nature's Voice" Details

- **UID**: natures-voice-detail
- **Title**: Nature's Voice - Sound Installation
- **Description**: An acoustic sculpture that amplifies and transforms natural sounds, creating an immersive audio experience.
- **Info**: The piece uses natural materials to create resonance chambers that enhance environmental sounds.
- **Author**: Artist Name
- **Images**:
  - [Upload: natures-voice-1.jpg]
  - [Upload: natures-voice-2.jpg]

## 4. Linking Instructions

### How to Link in Prismic:

1. **Create Collections first** (outdoor-sculpture-park, indoor-gallery, public-art-walk)

2. **Create Content Items** and link them to Collections:
   - Add "Breathing Guidance" to "Outdoor Sculpture Park" collection
   - Add "Harmony in Motion" to "Outdoor Sculpture Park" collection
   - Add "Eternal Flow" to "Public Art Walk" collection
   - Add "Urban Reflection" to "Indoor Gallery" collection
   - Add "Nature's Voice" to "Public Art Walk" collection

3. **Create Details** and link them to Content Items:
   - Link "breathing-guidance-detail" to "Breathing Guidance" content item
   - Link "harmony-motion-detail" to "Harmony in Motion" content item
   - Link "eternal-flow-detail" to "Eternal Flow" content item
   - Link "urban-reflection-detail" to "Urban Reflection" content item
   - Link "natures-voice-detail" to "Nature's Voice" content item

## 5. Expected Result Structure

After adding this data, you should have:

```
Collections:
├── outdoor-sculpture-park
│   ├── Breathing Guidance (content item)
│   │   └── breathing-guidance-detail (detail)
│   └── Harmony in Motion (content item)
│       └── harmony-motion-detail (detail)
├── indoor-gallery
│   └── Urban Reflection (content item)
│       └── urban-reflection-detail (detail)
└── public-art-walk
    ├── Eternal Flow (content item)
    │   └── eternal-flow-detail (detail)
    └── Nature's Voice (content item)
        └── natures-voice-detail (detail)
```

This structure will allow you to test the complete flow from Collection → Content Items → Details with multiple images per detail.
