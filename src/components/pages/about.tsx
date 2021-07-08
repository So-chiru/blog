import '@/styles/about.scss'

import { concatClass } from '@/utils/component'
import { RiGithubFill } from 'react-icons/ri'
import AboutSectionContainer from '../elements/AboutSection/container'
import { LongBiography } from '../elements/Biography/long'
import { ErrorTemplateComponent } from '../elements/Error'
import { LinkHeaderContainer as LinkHeader } from '../elements/LinkHeader'
import { SpacerComponent } from '../elements/Spacer'
import SiteMetadata from '../metadata'

interface MusicRecommend {
  name: string
  link: string
  color: string
}

const arrayPickRandom = (arr: MusicRecommend[]): MusicRecommend => {
  return arr[Math.floor(arr.length * Math.random())]
}

const AboutMe = () => {
  const randomMusic = arrayPickRandom([
    {
      name: 'DAY6 (Even of Day) - 뚫고 지나가요',
      link: 'https://youtu.be/N2p__-LRBNc',
      color: '#4c8561'
    },
    {
      name: 'DAY6 (Even of Day) - 우린',
      link: 'https://youtu.be/tqyrl2V1kTM',
      color: '#4c8561'
    },
    {
      name: 'ヨルシカ (Yorushika) - 又三郎 (Matasaburo)',
      link: 'https://youtu.be/x8xxFKVkNpw',
      color: '#81c6e6'
    },
    {
      name: 'ヨルシカ (Yorushika) - 雨とカプチーノ (Rain with Cappuccino)',
      link: 'https://youtu.be/PWbRleMGagU',
      color: '#ebeb65'
    },
    {
      name: 'ラックライフ (Luck Life) - 名前を呼ぶよ',
      link: 'https://youtu.be/-g6MYL5lOZs',
      color: '#9c9c9c'
    },
    {
      name: 'BTS - Stay Gold',
      link: 'https://youtu.be/9IHwqdz8Xhw',
      color: '#f0c45d'
    },
    {
      name: 'BTS - Stay Gold',
      link: 'https://youtu.be/9IHwqdz8Xhw',
      color: '#f0c45d'
    },
    {
      name: '달의하루 - 염라',
      link: 'https://youtu.be/jv543Nk5s18',
      color: '#e06e72'
    },
    {
      name: 'IU - 자장가',
      link: 'https://youtu.be/aepREwo5Lio',
      color: '#cbd1c2'
    }
  ])

  return (
    <div className='about-me'>
      <div className='section'>
        <h3 className='summary-title'>My Life Goals</h3>
        <h1 className='title'>
          I want to empower people by making useful tools, which gives{' '}
          <span className='highlight'>motivation</span> through{' '}
          <span className='highlight-second'>never-been experiences</span>.
        </h1>
      </div>
      <div className='section'>
        <h3 className='summary-title'>I&apos;m into...</h3>
        <h1 className='title'>
          {[
            {
              name: 'TypeScript (+ JavaScript)',
              color: '#007acc'
            },
            {
              name: 'Golang',
              color: '#29BEB0'
            },
            {
              name: 'Rust',
              color: '#d95d1b'
            },
            {
              name: 'Lua',
              color: '#00007D'
            }
          ].map(item => (
            <span key={item.name}>
              <span
                className='highlight'
                style={{ ['--color' as string]: item.color }}
              >
                {item.name}
              </span>
              ,{' '}
            </span>
          ))}{' '}
          and more...
        </h1>
      </div>
      <div className='section'>
        <h3 className='summary-title'>개발 의뢰도 받으시나요?</h3>
        <h1 className='title'>
          네, 받고 있습니다. 위에 적힌 이메일로 의뢰하실 내용을 간략히 넣어
          보내주세요.
        </h1>
      </div>
      <div className='section'>
        <h3 className='summary-title'>그래서 누구에요</h3>
        <h1 className='title'>개발하는 한국 사람이에요</h1>
      </div>
      <div className='section'>
        <h3 className='summary-title'>무슨 노래 즐겨 들어요?</h3>
        <h1 className='title'>
          DAY6, Yorushika, RADWIMPS... 그리고 밴드 스타일 가요 몇 개?
        </h1>
      </div>
      <div className='section'>
        <h3 className='summary-title'>노래 추천해주세요!</h3>
        <h1 className='title'>
          {
            <a
              className='highlight-box'
              href={randomMusic.link}
              target='_blank'
              rel='noreferrer'
              style={{ ['--color' as string]: randomMusic.color }}
            >
              {randomMusic.name}
            </a>
          }
        </h1>
      </div>
      <div className='section'>
        <h3 className='summary-title'>MBTI는 뭐에요?</h3>
        <h1 className='title'>INFJ.</h1>
      </div>
      <div className='section'>
        <h3 className='summary-title'>Q: 안물안궁</h3>
        <h1 className='title'>🤬</h1>
      </div>
    </div>
  )
}

const Careers = () => {
  return (
    <div className='careers'>
      <SpacerComponent h={128}>
        <ErrorTemplateComponent
          title='No careers yet...'
          mute='feel free to contact me!'
        ></ErrorTemplateComponent>
      </SpacerComponent>
    </div>
  )
}

const ProjectListData = [
  {
    name: 'zechCore',
    description: 'A peer-to-peer Live Streaming framework using WebRTC.',
    language: {
      color: '#f0db4f',
      text: 'JavaScript'
    },
    links: [
      {
        text: 'View Github Repository',
        url: 'https://github.com/So-chiru/zechCore'
      }
    ]
  },
  {
    name: 'llct',
    description: 'front of lovelivec.kr, LoveLive Call Table',
    language: {
      color: '#007acc',
      text: 'TypeScript'
    },
    links: [
      {
        text: 'View Github Repository',
        url: 'https://github.com/So-chiru/llct'
      },
      {
        text: 'Goto Homepage',
        url: 'https://lovelivec.kr'
      }
    ]
  }
]

const Projects = () => {
  const move = (url: string) => {
    window.open(url, '_blank')
  }

  return (
    <SpacerComponent template='about-projects'>
      <div className='projects'>
        {ProjectListData.map(item => (
          <div
            className='project-item'
            key={item.name}
            role='region'
            aria-label={
              item.name +
              ' project: ' +
              item.description +
              '. written in ' +
              item.language.text
            }
          >
            <div className='metadata'>
              <h3 className='title'>{item.name}</h3>
              <p className='description'>{item.description}</p>
              <p className='tags'>
                <span
                  className='language'
                  style={{
                    ['--color' as string]: item.language.color
                  }}
                >
                  {item.language.text}
                </span>
              </p>
            </div>
            <div className='links'>
              {item.links.map(link => (
                <a
                  key={link.url}
                  href={link.url}
                  aria-label={item.name + ' project: ' + link.text}
                >
                  {link.text}
                </a>
              ))}
            </div>
          </div>
        ))}
        <div
          className='repository-button'
          tabIndex={0}
          role='button'
          onClick={() =>
            move && move('https://github.com/So-chiru?tab=repositories')
          }
          onKeyPress={ev =>
            ev.key === 'Enter' &&
            move &&
            move('https://github.com/So-chiru?tab=repositories')
          }
        >
          <span className='icon'>
            <RiGithubFill></RiGithubFill>
          </span>
          <span className='text'>View more from my GitHub</span>
        </div>
      </div>
    </SpacerComponent>
  )
}

const AboutPage = () => {
  return (
    <div className={concatClass('page', 'about-page')}>
      <SiteMetadata title='Sochiru'></SiteMetadata>
      <SpacerComponent flex={true} template='about-header'>
        <LinkHeader></LinkHeader>
      </SpacerComponent>
      <SpacerComponent template='long-biography'>
        <LongBiography></LongBiography>
      </SpacerComponent>
      <SpacerComponent template='about-section'>
        <AboutSectionContainer name='Careers'>
          <Careers></Careers>
        </AboutSectionContainer>
      </SpacerComponent>
      <SpacerComponent template='about-section'>
        <AboutSectionContainer name='Projects'>
          <Projects></Projects>
        </AboutSectionContainer>
      </SpacerComponent>
      <SpacerComponent template='about-me'>
        <AboutMe></AboutMe>
      </SpacerComponent>
    </div>
  )
}

export default AboutPage
