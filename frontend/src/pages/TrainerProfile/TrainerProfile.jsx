import './trainer.css';

// eslint-disable-next-line react/prop-types
const TrainerProfile = ({ specialty, experience, bio }) => {
    return (
        <div className="trainer-profile">
            <div className="profile-image">
                <img src="src/images/965.jpg" width="300" alt="Hash" />
            </div>
            <div className="profile-details">
                <h2>Hashley Beedah</h2>
                <p><strong>Specialty: Body building, weight loss, functional training, sports specific, boxing, nutrition</strong> {specialty}</p>
                <p><strong>Experience: 10 years</strong> {experience}</p>
                <p><strong>Bio: Hash is a certified personal trainer with over 10 years of experience in weight training and fitness coaching. He has helped hundreds of clients achieve their fitness goals through personalized workout plans and nutrition guidance.</strong> {bio}</p>
            </div>
        </div>
    );
};


export default TrainerProfile;
