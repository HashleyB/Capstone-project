import CardItem from './CardItem'
import './Cards.css'

const Cards = () => {
  return (
    <div className='cards'>
        <div className="cards__container">
            <div className="cards__wrapper">
                <ul className="cards__items">
                    <CardItem 
                    src="src/images/deadlift.jpg"
                    text="Create and manage your clients' exercise routines"
                    label='Fitness'
                    path='/fitness'
                    />
                    <CardItem 
                    src="src/images/pt.webp"
                    text="Add new profiles with clients' information and goals"  
                    label='Client forms'
                    path='/clients'
                    />
                </ul>
                <ul className="cards__items">
                    <CardItem 
                    src="src/images/chat.webp"
                    text="Keep in touch with your clients. Give them advice and motivation"
                    label='Chat with clients'
                    path='/chat'
                    />
                    <CardItem 
                    src="src/images/clock.jpeg"
                    text="Book and manage your consultations and training sessions"  
                    label='Planner'
                    path='/planner'
                    />
                    <CardItem 
                    src="src/images/fitnesschal.png"
                    text="View and post challenges for your clients to participate in"  
                    label='Challenges'
                    path='/challenges'
                    />
                </ul>
            </div>
            </div>
    </div>
  )
}

export default Cards