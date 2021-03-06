import { GetStaticProps } from 'next'

import Head from 'next/head';
import { stripe } from 'src/services/stripe';
import { SubscribeButton } from '../components/SubscribeButton'

import styles from './home.module.scss'

interface IHomeProps {
  product: {
    priceId: string,
    amount: string
  }

}



export default function Home({ product }: IHomeProps) {


  console.log('props', product)

  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentConteiner}>
        <section className={styles.hero}>
          <span>✌️hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>

          <SubscribeButton priceId={product.priceId}/>
        </section>

        <img src="/images/avatar.svg" alt="girl coding" />
      </main>
    </>
  )
}


export const getStaticProps: GetStaticProps = async () => {


  // priceID price_1L4UZSGMyWqStVMYgFFmSZl0

  const price = await stripe.prices.retrieve('price_1L4UZSGMyWqStVMYgFFmSZl0')

  const product = {
    priceId: price.id,
    // amount: (price.unit_amount / 100),
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount / 100)
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24, //24 horas
  }
}