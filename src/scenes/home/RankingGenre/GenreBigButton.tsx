import { Button } from '@material-ui/core';
import React from 'react';
import classes from './RankingGenre.module.css';
import { 
    action, adventure, autorealization, biography,
    children, comedy, drama, education, fantasy, fiction,
    mistery, novel, poetry, police, romance, selfhelp,
    terror, tragic,
} from '../../../assets';


interface GenreBigButtonProps {
    id: string,
    title: string,
    selected: boolean,
    onClick(): void,
    endIconKey: string,
}

const GenreBigButton = (props: GenreBigButtonProps) => {
    const {id, title, selected, onClick, endIconKey} = props;
    
    const getIconByBookGenre = (key: string) => {
        switch (key) {
            case 'Aventura':            return (<img src={adventure        } alt='adventure        ' height='40px' width='40px'/>);
            case 'Acción':              return (<img src={action           } alt='action           ' height='40px' width='40px'/>);
            case 'Auto-ayuda':          return (<img src={selfhelp         } alt='selfhelp         ' height='40px' width='40px'/>);
            case 'Auto-realización':    return (<img src={autorealization  } alt='autorealization  ' height='40px' width='40px'/>);
            case 'Biografías':          return (<img src={biography        } alt='biography        ' height='40px' width='40px'/>);
            case 'Comedia':             return (<img src={comedy           } alt='comedy           ' height='40px' width='40px'/>);
            case 'Drama':               return (<img src={drama            } alt='drama            ' height='40px' width='40px'/>);
            case 'Educativos':          return (<img src={education        } alt='education        ' height='40px' width='40px'/>);
            case 'Fantasia':            return (<img src={fantasy          } alt='fantasy          ' height='40px' width='40px'/>);
            case 'Ficción':             return (<img src={fiction          } alt='fiction          ' height='40px' width='40px'/>);
            case 'Infantiles':          return (<img src={children         } alt='children         ' height='40px' width='40px'/>);
            case 'Misterio':            return (<img src={mistery          } alt='mistery          ' height='40px' width='40px'/>);
            case 'Novela':              return (<img src={novel            } alt='novel            ' height='40px' width='40px'/>);
            case 'Poesías':             return (<img src={poetry           } alt='poetry           ' height='40px' width='40px'/>);
            case 'Policiales':          return (<img src={police           } alt='police           ' height='40px' width='40px'/>);
            case 'Romance':             return (<img src={romance          } alt='romance          ' height='40px' width='40px'/>);
            case 'Terror':              return (<img src={terror           } alt='terror           ' height='40px' width='40px'/>);
            case 'Trágica':             return (<img src={tragic           } alt='tragic           ' height='40px' width='40px'/>);
            default: return (<img src={action} alt='action' height='40px' width='40px'/>);
        }
    };
    return (
        <Button
            key={id}
            onClick={onClick}
            variant='contained' size='large' 
            color={selected ? 'primary' : 'secondary'}
            className={classes.bigButton}
            endIcon={getIconByBookGenre(endIconKey)}
        >{title}</Button>
    );
};


export default GenreBigButton;
