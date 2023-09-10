import imagen from '../../assets/GitHub.png';
import './Made.css';

function Made({name}: {name: string}){
    return(
        <div className='Made-Bar' >
            <div>
                <img src={imagen} alt="GitHub" loading='lazy' />
            </div>
            <p>@{name}</p>
        </div>
    )
}

export default Made;