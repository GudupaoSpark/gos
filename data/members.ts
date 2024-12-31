export interface Member {
  name: string
  github: string
  role: {
    en: string
    zh: string
  }
  description: {
    en: string
    zh: string
  }
}

export const members: Member[] = [
  {
    name: '冬瓜',
    github: 'dongguacute',
    role: {
      zh: '创始人',
      en: 'Founder'
    },
    description: {
      zh: '古都炮核心开发者，创始人',
      en: 'Core developer and founder of Gudupao'
    }
  },
  {
    name: 'Debug967',
    github: 'lidongxun967',
    role: {
      zh: 'CEO',
      en: 'CEO'
    },
    description: {
      zh: '古都炮核心开发者，现任CEO',
      en: 'Core developer and current CEO of Gudupao'
    }
  },
  {
    name: '柚子柚子',
    github: 'youzi-3222',
    role: {
      zh: 'APP 总管',
      en: 'APP Manager'
    },
    description: {
      zh: '古都炮核心开发者，管理会成员',
      en: 'Core developer and management committee member of Gudupao'
    }
  }
] 