export const email = () => {
    return (
        <div>
            <form>
                <div>
                    <label htmlFor="email">Enter Email</label>
                    <input type="email" id="email" name="email" placeholder="example@email.com" autoComplete="email" required />
                </div>
                <div>
                    <button type="submit"></button>
                </div>
            </form>
        </div>
    )
}