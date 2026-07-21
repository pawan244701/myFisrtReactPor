export const Contact = () => {
    return (
        <main>
                        <header>
                <h1>Get in Touch</h1>
                <p>Have feedback on this project, or want to collaborate? Send a message below.</p>
            </header>
            <section>
                <form>
                    <div>
                        <label htmlFor="name">Your Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="enter your name"
                            autoComplete="name"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor=""></label>
                    </div>
                    {/* lets leave it i'm not gonna attach my my details people can connect by linkedin
                    
                        by the way the plan was: make user to a form if they want to connect */}
                </form>
            </section>
        </main>
    )
}