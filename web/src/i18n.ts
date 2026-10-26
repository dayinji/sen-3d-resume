// 站点语言：目前只有阿拉伯语（RTL）。要加语言：在这里扩展 Lang，并给各处 Record<Lang, …> 补上对应文案
export type Lang = 'ar'

// 文字方向：阿拉伯语从右到左。只加在文字块上，不翻转整页布局（3D 模型 / 右侧时间轴位置不变）
export const dirOf = (lang: Lang): 'rtl' | 'ltr' => (lang === 'ar' ? 'rtl' : 'ltr')
