import s from "./PageNotFound.module.css";

export const PageNotFound = () => {
    return (
        <div className={s.container}>
            <h1 className={s.code}>404</h1>
            <p className={s.message}>Page not found. We can’t find what you’re looking for</p>
            <a href="/" className={s.link}>To main Page</a>
        </div>
    )
}
