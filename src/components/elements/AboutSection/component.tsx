interface AboutSectionComponentProps {
  name: string
  children: JSX.Element
}

const AboutSectionComponent = ({
  name,
  children
}: AboutSectionComponentProps) => {
  return (
    <div className='about-section' role='group' aria-label={name}>
      <p className='section-title'>{name}</p>
      <div className='contents'>{children}</div>
    </div>
  )
}

export default AboutSectionComponent
