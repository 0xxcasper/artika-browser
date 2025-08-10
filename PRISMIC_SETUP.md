Offers content types

This project defines two Prismic Custom Types used by the Offers feature:

- offers_page (Singleton)
  - title: Text
  - description: Rich Text

- offer (Repeatable)
  - uid: UID
  - title: Text
  - short_description: Text
  - thumbnail: Image
  - images: Group(Image)
  - button_text: Text (optional)
  - button_link: Link (optional)
  - detail_title: Text
  - detail_description: Rich Text
  - utilities: Group { title: Text, contents: Rich Text (list) }
  - notes_title: Text
  - notes_contents: Rich Text (list)
  - notes_button_text: Text (optional)
  - notes_button_link: Link (optional)

Importing types

1. Ensure Slice Machine is configured (slicemachine.config.json points to ./customtypes)
2. Run Slice Machine and push models:

   npx slicemachine --push --yes

3. In Prismic, add content for `offers_page` and create some `offer` documents. UIDs become the detail URLs at /[locale]/offer/[uid].

# Cấu hình Prismic cho Homepage

## Bước 1: Tạo Repository Prismic

1. Truy cập [Prismic.io](https://prismic.io) và tạo tài khoản
2. Tạo một repository mới
3. Ghi nhớ tên repository để cập nhật trong code

## Bước 2: Cập nhật Repository Name

Trong file `src/libs/prismic.ts`, thay đổi:

```typescript
export const repositoryName = 'your-repository-name';
```

thành tên repository thực tế của bạn.

## Bước 3: Tạo Custom Type cho Homepage

Trong Prismic, tạo một Custom Type với tên "homepage" và cấu trúc như sau:

```json
{
  "id": "homepage",
  "label": "Homepage",
  "format": "page",
  "repeatable": false,
  "status": true,
  "json": {
    "Main": {
      "title": {
        "type": "Text",
        "config": {
          "label": "Title",
          "placeholder": "Page title"
        }
      },
      "hero_title": {
        "type": "Text",
        "config": {
          "label": "Hero Title",
          "placeholder": "Hero section title"
        }
      },
      "hero_subtitle": {
        "type": "StructuredText",
        "config": {
          "label": "Hero Subtitle",
          "placeholder": "Hero section subtitle",
          "allowTargetBlank": true,
          "single": "paragraph"
        }
      },
      "hero_background_image": {
        "type": "Image",
        "config": {
          "label": "Hero Background Image",
          "constraint": {},
          "thumbnails": []
        }
      },
      "about_title": {
        "type": "Text",
        "config": {
          "label": "About Title",
          "placeholder": "About section title"
        }
      },
      "about_description": {
        "type": "StructuredText",
        "config": {
          "label": "About Description",
          "placeholder": "About section description",
          "allowTargetBlank": true,
          "single": "paragraph"
        }
      },
      "about_button_text": {
        "type": "Text",
        "config": {
          "label": "About Button Text",
          "placeholder": "About section button text"
        }
      },
      "focus_title": {
        "type": "Text",
        "config": {
          "label": "Focus Title",
          "placeholder": "Focus section title"
        }
      },
      "focus_description": {
        "type": "StructuredText",
        "config": {
          "label": "Focus Description",
          "placeholder": "Focus section description",
          "allowTargetBlank": true,
          "single": "paragraph"
        }
      },
      "focus_button_text": {
        "type": "Text",
        "config": {
          "label": "Focus Button Text",
          "placeholder": "Focus section button text"
        }
      },
      "focus_background_image": {
        "type": "Image",
        "config": {
          "label": "Focus Background Image",
          "constraint": {},
          "thumbnails": []
        }
      },
      "grid_images_title": {
        "type": "Text",
        "config": {
          "label": "Grid Images Title",
          "placeholder": "Grid images section title"
        }
      },
      "info_sections": {
        "type": "Group",
        "config": {
          "label": "Info Sections",
          "fields": {
            "title": {
              "type": "Text",
              "config": {
                "label": "Section Title",
                "placeholder": "Section title"
              }
            },
            "description": {
              "type": "StructuredText",
              "config": {
                "label": "Section Description",
                "placeholder": "Section description",
                "allowTargetBlank": true,
                "single": "paragraph"
              }
            },
            "image": {
              "type": "Image",
              "config": {
                "label": "Section Image",
                "constraint": {},
                "thumbnails": []
              }
            }
          }
        }
      }
    }
  }
}
```

## Bước 4: Tạo Document Homepage

1. Trong Prismic, tạo một document mới với type "homepage"
2. Điền đầy đủ thông tin cho các field đã định nghĩa
3. Publish document

## Bước 5: Cấu hình Environment Variables

Tạo file `.env.local` và thêm:

```
PRISMIC_REPOSITORY_NAME=your-repository-name
PRISMIC_ACCESS_TOKEN=your-access-token
```

## Bước 6: Cài đặt Slice Machine (Tùy chọn)

Nếu muốn sử dụng Slice Machine để quản lý components:

```bash
npm install -g @slicemachine/init
npx @slicemachine/init@latest
```

## Cấu trúc Files đã tạo:

- `src/libs/prismic.ts` - Cấu hình Prismic client
- `src/libs/prismic-helpers.ts` - Helper functions để xử lý dữ liệu
- `src/hooks/usePrismic.ts` - Custom hook để fetch dữ liệu
- `src/app/api/homepage/route.ts` - API route để fetch homepage data
- `src/modules/home/index.tsx` - Homepage component đã được cập nhật

## Lưu ý:

- Code đã được thiết kế để fallback về translation nếu không có dữ liệu từ Prismic
- Các helper functions giúp xử lý dữ liệu từ Prismic một cách an toàn
- API route được tạo để fetch dữ liệu từ server-side
