import AboutSectionComponent from './component'

interface AboutSectionContainerProps {
  name: string
  children: JSX.Element
}

const AboutSectionContainer = ({
  name,
  children
}: AboutSectionContainerProps) => {
  return <AboutSectionComponent name={name}>{children}</AboutSectionComponent>
}

export default AboutSectionContainer
