import Head from 'next/head'

interface ISeoProps {
  title: string
  description?: string
  keywords?: string
}

const SEO = ({ title, description, keywords }: ISeoProps): JSX.Element => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={title + ' - ' + description} />
      <meta name="keywords" content="dashboard, loker, eurocar service" />
    </Head>
  )
}

export default SEO
