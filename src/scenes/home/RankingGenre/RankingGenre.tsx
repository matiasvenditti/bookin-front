import { Button, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { Book, KeyValue } from '../../../model';
import { allBookGenres } from '../../../utils';
import classes from './RankingGenre.module.css';
import { 
    action, adventure, autorealization, biography,
    children, comedy, drama, education, fantasy, fiction,
    mistery, novel, poetry, police, romance, selfhelp,
    terror, tragic,
} from '../../../assets';
import { BooksService } from '../../../services';


const getIconByBookGenre = (key: string) => {
    switch (key) {
        case 'Aventura':            return (<img src={action            } alt='action           ' height='40px' width='40px'/>);
        case 'Acción':              return (<img src={adventure         } alt='adventure        ' height='40px' width='40px'/>);
        case 'Auto-ayuda':          return (<img src={autorealization   } alt='autorealization  ' height='40px' width='40px'/>);
        case 'Auto-realización':    return (<img src={biography         } alt='biography        ' height='40px' width='40px'/>);
        case 'Biografías':          return (<img src={children          } alt='children         ' height='40px' width='40px'/>);
        case 'Comedia':             return (<img src={comedy            } alt='comedy           ' height='40px' width='40px'/>);
        case 'Drama':               return (<img src={drama             } alt='drama            ' height='40px' width='40px'/>);
        case 'Educativos':          return (<img src={education         } alt='education        ' height='40px' width='40px'/>);
        case 'Fantasia':            return (<img src={fantasy           } alt='fantasy          ' height='40px' width='40px'/>);
        case 'Ficción':             return (<img src={fiction           } alt='fiction          ' height='40px' width='40px'/>);
        case 'Infantiles':          return (<img src={mistery           } alt='mistery          ' height='40px' width='40px'/>);
        case 'Misterio':            return (<img src={novel             } alt='novel            ' height='40px' width='40px'/>);
        case 'Novela':              return (<img src={poetry            } alt='poetry           ' height='40px' width='40px'/>);
        case 'Poesías':             return (<img src={police            } alt='police           ' height='40px' width='40px'/>);
        case 'Policiales':          return (<img src={romance           } alt='romance          ' height='40px' width='40px'/>);
        case 'Romance':             return (<img src={selfhelp          } alt='selfhelp         ' height='40px' width='40px'/>);
        case 'Terror':              return (<img src={terror            } alt='terror           ' height='40px' width='40px'/>);
        case 'Trágica':             return (<img src={tragic            } alt='tragic           ' height='40px' width='40px'/>);
        default: return (<img src={action} alt='action' height='40px' width='40px'/>)
    }
}

interface RankingGenreProps {
    getErrorCallback(): void,
}

const RankingGenre = (props: RankingGenreProps) => {
    const [selector, setSelector] = useState<string | null>(null); // all genres + null state
    const [books, setBooks] = useState<Book[]>([]);

    const _request = (key: string) => {
        console.log(key);
        BooksService.getRankingByRanking(key)
            .then((response) => {
                setBooks(response.data);
            })
            .catch((error) => {
                props.getErrorCallback()
            })
    }

    const handleClickGenre = (key: string) => {
        setSelector(key);
        _request(key)
    }

    const renderList = () => {
        if (!selector) return null;

    }

    return (
        <div className={classes.container}>
            <Typography align='center' variant='h4' className={classes.title}>Elegí tu género favorito</Typography>
            <div className={classes.buttonsContainer}>
                {allBookGenres.map((bookGenre: KeyValue) => (
                    <BigButton
                        key={bookGenre.key}
                        title={bookGenre.value}
                        onClick={() => handleClickGenre(bookGenre.key)}
                        endIcon={getIconByBookGenre(bookGenre.key)}
                    />
                ))}
            </div>
            {renderList()}
        </div>
    )
}

const BigButton = (props: {key: string, title: string, onClick(): void, endIcon: any}) => {
    const {key, title, onClick, endIcon} = props;

    return (
        <div className={classes.bigButtonContainer}>
            <Button
                key={key}
                onClick={onClick}
                variant='contained' size='large' color='primary' 
                className={classes.bigButton}
                endIcon={endIcon}
            >{title}</Button>
        </div>
    );
};


export default RankingGenre;
