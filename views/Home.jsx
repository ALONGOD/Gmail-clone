const { Link } = ReactRouterDOM
export function Home() {
    return <section className="home flex flex-column">
        <img src="assets/img/homepage-logo.png" />
        <h1>Appsus!</h1>
        <h1>The Easiest Way To Manage Your Life</h1>
        <footer>
            <Link to="/mail">Email</Link>
            <Link to="/note">Keep Notes</Link>
            <Link to="/note">Keep Books</Link>
            <Link to="/about">About</Link>
        </footer>
    </section>
}