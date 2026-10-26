import type { Lang } from '../i18n'

// 作品集 / 服务数据（按语言）。5 大板块 → 点击展开作品详情。
// 纯数据驱动：增删板块 / 作品只改本文件，Works.jsx 仅负责渲染。
//
// 板块字段：
//   id        唯一标识（用于 framer layoutId 共享元素动画）
//   no        编号 '01'…'05'
//   title     板块标题
//   tagline   索引行右侧一句话
//   items[]   扁平作品列表：{ name, meta?, tags?, link? }
//             点击 item 弹出全屏详情，可补充可选媒体/文案字段：
//             { image?, video?, year?, desc? }（缺省时媒体用占位、简介回退 meta/标签）
//   groups[]  分组作品（与 items 二选一）：{ heading, items: string[] }
//   awards[]  奖项 chip（可选）
//   footer    底部技术/备注一行（可选）

export interface WorkListItem {
  name: string
  meta?: string
  tags?: string[]
  link?: string
  slug?: string
}

export interface WorkGroup {
  heading: string
  items: string[]
}

export interface WorkSection {
  id: string
  no: string
  title: string
  tagline: string
  items?: WorkListItem[]
  groups?: WorkGroup[]
  awards?: string[]
  footer?: string
}

export interface WorksLang {
  dir?: 'rtl' | 'ltr'
  title: string
  closeLabel: string
  openLabel: string
  hint: string
  awardsLabel: string
  visitLabel: string
  detailPlaceholder: string
  phImageLabel: string
  phButtonLabel: string
  countLabel: (n: number) => string
  sections: WorkSection[]
}

// 「ماذا أقدّم؟」：每个板块 = 一项服务，items 为要点（无 slug / link 的条目只展示、不可点开详情）
export const WORKS: Record<Lang, WorksLang> = {
  ar: {
    title: 'ماذا أقدّم؟',
    closeLabel: 'رجوع',
    openLabel: 'استكشف',
    hint: 'تابع التمرير',
    awardsLabel: 'الجوائز',
    visitLabel: 'زيارة الموقع',
    detailPlaceholder: 'وصف المشروع',
    phImageLabel: 'صورة / فيديو',
    phButtonLabel: 'زر الرابط',
    countLabel: (n) => `${n} عناصر`,
    sections: [
      {
        id: 'web',
        no: '01',
        title: 'تطوير الويب',
        tagline: '443/tcp',
        items: [
          { name: 'تطوير مواقع وتطبيقات ويب متجاوبة.' },
          { name: 'بناء الواجهات وربطها بالخوادم وقواعد البيانات.' },
          { name: 'تطوير واجهات برمجية وربط الخدمات المختلفة.' },
          { name: 'تحسين الأداء وتجربة المستخدم.' },
          { name: 'مراعاة الممارسات الأمنية أثناء التطوير.' },
        ],
      },
      {
        id: 'bots',
        no: '02',
        title: 'بوتات تيليغرام',
        tagline: '8443/tcp',
        items: [
          { name: 'تطوير بوتات مخصصة حسب احتياجات المشروع.' },
          { name: 'أتمتة الردود والمهام المتكررة.' },
          { name: 'إدارة المجموعات والقنوات والطلبات.' },
          { name: 'التكامل مع قواعد البيانات وواجهات API.' },
          { name: 'تطوير حلول تساعد على تقليل العمل اليدوي.' },
        ],
      },
      {
        id: 'security',
        no: '03',
        title: 'الأمن السيبراني',
        tagline: '31337/tcp',
        items: [
          { name: 'اختبار أمان تطبيقات الويب ضمن نطاق مصرح به.' },
          { name: 'تحليل الثغرات الأمنية وتقييم مخاطرها.' },
          { name: 'إعداد تقارير فنية واضحة مع توصيات للإصلاح.' },
          { name: 'مراجعة الشيفرات والمساعدة على تحسين أمانها.' },
          { name: 'تقديم إرشادات لتقوية الأنظمة والخوادم.' },
        ],
      },
      {
        id: 'projects',
        no: '04',
        title: 'مشاريع المبرمجين',
        tagline: 'من الفكرة إلى التطبيق',
        items: [
          { name: 'تطوير أفكار برمجية وتحويلها إلى تطبيقات عملية.' },
          { name: 'المساهمة في تطوير المشاريع القائمة وإضافة ميزات جديدة.' },
          { name: 'تحسين الشيفرات وتنظيمها وتسهيل صيانتها.' },
          { name: 'المساعدة في ربط الخدمات وقواعد البيانات والواجهات البرمجية.' },
          { name: 'تقديم حلول تقنية تناسب متطلبات المشروع.' },
        ],
      },
    ],
  },
}

// 板块配图（横向画廊每张卡片左侧的整高封面）。放到 public/works/covers/ 下。
// 缺图时左栏用大编号渐变占位，放入图片后自动点亮。
// 缺图时左栏用大编号渐变占位；放入图片（如 public/works/covers/web.jpg）并在此登记后自动点亮
export const SECTION_COVERS: Record<string, string> = {}

// 统计一个板块的作品数（items 或 groups 求和），用于索引行 hover 显示
export function sectionCount(section: WorkSection): number {
  if (section.items) return section.items.length
  if (section.groups) return section.groups.reduce((n, g) => n + g.items.length, 0)
  return 0
}
