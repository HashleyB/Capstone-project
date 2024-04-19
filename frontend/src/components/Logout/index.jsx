import styles from './styles.module.css';

const Logout = () => {
    return (
        <div>
            <h1>You have successfully logged out!</h1>
            <p>Thank you for using our application.</p>
            <button type="button" className={styles.green_btn} onClick={() => window.location = '/login'}> Back to homepage</button>
        </div>
    );
};

export default Logout;