import '@/styles/about.scss'

import { concatClass } from '@/utils/component'
import { RiGithubFill } from 'react-icons/ri'
import AboutSectionContainer from '../elements/AboutSection/container'
import { LongBiography } from '../elements/Biography/long'
import { ErrorTemplateComponent } from '../elements/Error'
import { LinkHeaderContainer as LinkHeader } from '../elements/LinkHeader'
import { SpacerComponent } from '../elements/Spacer'
import SiteMetadata from '../metadata'

const AboutMe = () => {
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
              color: '#000'
            }
          ].map(item => (
            <span key={item.name}>
              <span
                // className='highlight'
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
        <h3 className='summary-title'>그래서 누군데요</h3>
        <h1 className='title'>개발하는 한국 사람이에요</h1>
      </div>
      <div className='section'>
        <h3 className='summary-title'>Q: 무슨 노래 즐겨 들어요?</h3>
        <h1 className='title'>
          DAY6, Yorushika, ツユ, 그리고 듣기 좋은 가요 몇 개?
        </h1>
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
          mute='I’m available for jobs, feel free to contact me!'
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
