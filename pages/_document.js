// import components from next's document library
import Document, { Html, Head, Main, NextScript } from "next/document";
import { getSessionFromServer, getUserScript } from "../lib/auth";

class MyDocument extends Document {
  static getInitialProps = ctx => {
    const user = getSessionFromServer(ctx.req);

    return { ...user };
  };

  render() {
    const { user = {} } = this.props;

    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
          <meta name="description" content="auth-form-test" />
        </Head>
        <body>
          <Main />
          <script dangerouslySetInnerHTML={{ __html: getUserScript(user) }} />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
