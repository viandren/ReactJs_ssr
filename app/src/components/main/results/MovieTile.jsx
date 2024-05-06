import DropDown from './DropDown';
import './MovieTile.css';

import React from "react";
import { useState } from "react";

import Dialog from '../../dialogs/Dialog.jsx';
import MovieForm from '../../forms/MovieForm.jsx';
import DeleteForm from '../../forms/DeleteForm.jsx';
import ReactDOM from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';

export default function MovieTile(props) {

    const [showDropdown, setShowDropdown] = useState(false);

    const openDialog = () => {
        setDialogIsOpen(true);
        window.scrollTo(0, 0);
    }
    const closeDialog = (e) => {
        setDialogIsOpen(false);
    }
    const submitDialog = (e) => {
        console.log(e);
        setDialogIsOpen(false);
        props.editMovie(e);
    }
    const [dialogIsOpen, setDialogIsOpen] = useState(false);


    const openDeleteDialog = () => {
        setDeleteDialogIsOpen(true);
    }
    const closeDeleteDialog = (e) => {
        setDeleteDialogIsOpen(false);
    }
    const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false);


    const dialogForEditing = <Dialog closeDialog={closeDialog} title="Edit movie" 
    children={<MovieForm movie={props.movie} parentOnSubmit={submitDialog}/>} dialogIsOpen={dialogIsOpen}></Dialog>;

    const dialogForDeleting = <Dialog closeDialog={closeDeleteDialog} title="Delete movie" 
    children={<DeleteForm onSubmit={() => {props.deleteMovie(props.movie);closeDeleteDialog();}}/>} dialogIsOpen={deleteDialogIsOpen}></Dialog>;

    //const portalForEditing = ReactDOM.createPortal( dialogForEditing/*, document.body*/);
    //const portalForDeleting = ReactDOM.createPortal( dialogForDeleting/*, document.body*/);

    let dropdownContent = showDropdown ? <DropDown closeDropdown={setShowDropdown} editMove={props.editMove} 
    movie={props.movie} openDialog={openDialog} openDeleteDialog={openDeleteDialog}/> : ""

    const navigate = useNavigate();
    const location = useLocation();
    const onTileClick = () => {
        navigate('/' + props.movie.id + '/?' + new URLSearchParams(location.search).toString());
        window.scrollTo(0, 0);
    }

return (
    <>
    <div className="movie-tile" data-testid="movieTile" onClick={onTileClick}> 
        <div className="context-icon" onClick={(event) => {event.stopPropagation();setShowDropdown(!showDropdown);}}></div>
        {dropdownContent}
        <img className="poster" src={props.movie.poster_path} alt="image not found"
        onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src="https://www.popcorn.app/assets/app/images/placeholder-movieimage.png";
          }}/>
        <div className="title-row">
            <div className="title">{props.movie.title}</div>
            <div className="release-year">{new Date(props.movie.release_date).getFullYear()}</div>
        </div>
        <div className="genres">{props.movie.genres.join(', ')}</div>
    </div>
    </>
  )
}
