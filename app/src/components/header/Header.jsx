import './Header.css';

import React from "react";
import { useState } from "react";

import Dialog from '../dialogs/Dialog.jsx';
import MovieForm from '../forms/MovieForm.jsx';
import { useLocation, useNavigate, useParams, Outlet } from "@remix-run/react";
import SearchContainer from './SearchContainer';

export default function Header(props) {  
    
    const openDialog = () => {
        setDialogIsOpen(true);
    }
    const closeDialog = () => {
        setDialogIsOpen(false);
    }
    const submitDialog = () => {
        setDialogIsOpen(false);
    }
    const [dialogIsOpen, setDialogIsOpen] = useState(false);



    const location = useLocation();
    const navigate = useNavigate();
    const closeMovieDetails = () => {
        let params = new URLSearchParams(location.search);
        params.delete('query');
        navigate('/?' + params);
    }


    const { movieId } = useParams();
    
    const searchIcon = movieId === undefined 
            ? <button className="add-button" onClick={openDialog} >+ add movie</button>
            : <img className="magnifier-icon" src="/magnifier.svg" 
                onClick={closeMovieDetails} alt="search icon"></img>;

    const height = movieId === undefined ? "300px" : "500px";

    return  <div className="header" style={{height: height, transition: "height 0.15s ease-out"}}>
        <img className="header-bg" src="/netflix_image.jpg" alt="background"></img>
        <Dialog closeDialog={closeDialog} title="Add movie" children={<MovieForm parentOnSubmit={submitDialog}/>} dialogIsOpen={dialogIsOpen}></Dialog> 
        <div className="text-title-row">
            <span className="text-netflix">netflix</span>
            <span className="text-roulette">roulette</span>

            {searchIcon}
        </div>
        <SearchContainer />
        </div>;
}