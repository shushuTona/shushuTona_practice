import Head from 'next/head'
import { getAllPostIds, getPostData } from '../../../lib/posts'
import Layout from '../../components/layout'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

export default function Post ( { postData } ) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>

            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        </Layout>
    )
}

export async function getStaticPaths () {
    const paths = getAllPostIds()

    return {
        paths,
        fallback: false
    }
}

// getStaticPathsの実行完了後に、実行される
export async function getStaticProps ( { params } ) {
    const postData = await getPostData( params.id )

    return {
        props: {
            postData
        }
    }
}