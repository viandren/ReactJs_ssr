
import './MovieForm.css';

import React, { useState }  from "react";
import MultiSelectInput from "./MultiSelectInput";
import DatePickerField from "./DatePickerField";
import { Formik } from 'formik';
import axios from 'axios';
import { useMutation } from 'react-query';

export default function MovieForm({ movie: m , parentOnSubmit}) {

  let isNewMovie = false;

    if (m === undefined) {
      m = {
        "poster_path": "",
        "title": "",
        "release_date": new Date(),
        "genres": [],
        "vote_average": "",
        "runtime": "",
        "overview": ""
      }
      isNewMovie = true;
    }

    const newMovieMutation = useMutation(async (newMovieData) =>{
        console.log(newMovieData)
        console.log(JSON.stringify(newMovieData))
        const response = await axios({
          method: 'post',
          url: 'http://localhost:4000/movies',
          data: newMovieData
          
        })
        .then(function (response) {
          console.log(response);
          window.alert('Movie saved successfully!')
          parentOnSubmit();
          setHasBackendError(false);
        })
        .catch(function (error) {
          setErrorMessage(error.response.data.messages[0]);
          setHasBackendError(true);
          setErrorMessage(error.response.data.messages[0]);
          throw new Error('Error saving object: ' + error.message);
        });
        
    });

    const [hasBackendError, setHasBackendError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const editMovieMutation = useMutation(async (newMovieData) =>{
      console.log(newMovieData)
      console.log(JSON.stringify(newMovieData))
      const response = await axios({
        method: 'put',
        url: 'http://localhost:4000/movies',
        data: newMovieData
        
      })
      .then(function (response) {
        console.log(response);
        window.alert('Movie saved successfully!')
        parentOnSubmit();
        setHasBackendError(false);
      })
      .catch(function (error) {
        console.log(error.response.data.messages[0])
        setHasBackendError(true);
        setErrorMessage(error.response.data.messages[0]);
        throw new Error('Error saving object: ' + error.message);
      });
      
  });

  const handleUpdateMovie = async (newMovieData) => {
    try {
      await editMovieMutation.mutateAsync(newMovieData);
    } catch (error) {
      console.log(error)
    }
  };

  const handleAddNewMovie = async (newMovieData) => {
    try {
      await newMovieMutation.mutateAsync(newMovieData);
    } catch (error) {
      console.log(error)
    }
  };

  const genreOptions = [
    { value: "Horror", label: "Horror" },
    { value: "Comedy", label: "Comedy" },
    { value: "Fantasy", label: "Fantasy" },
    { value: "Adventure", label: "Adventure" },
    { value: "Action", label: "Action" },
    { value: "Drama", label: "Drama" }
  ];



  const validateForm = (values) => {
    const errors = {};
        if (!values.title) {
          errors.title = 'Required';
        }
        if (!values.release_date) {
          errors.release_date = 'Required';
        }
        if (!values.runtime) {
          errors.runtime = 'Required';
        } else if (isNaN(values.runtime)) {
          errors.runtime = 'Has to be a number';
        }
        if (!values.vote_average) {
          errors.vote_average = 'Required';
        } else if (isNaN(values.vote_average)) {
          errors.vote_average = 'Has to be a number';
        }
        if (!values.poster_path) {
          errors.poster_path = 'Required';
        }
        if (!values.overview) {
          errors.overview = 'Required';
        }
        console.log(values.genres)
        if (!values.genres || values.genres.length < 1) {
          errors.genres = 'At least one genre is required';
        }
        return errors;
  }

  console.log("isnewmovie: " + isNewMovie)

    return  <div data-testid="movieForm" id="movieform">
    <Formik
      initialValues={{...m, genres: m.genres.map(g=>{return { value: g, label: g }}), release_date: new Date(Date.parse(m.release_date))}}
      validate={values => validateForm(values)}
      onSubmit={(values, { setSubmitting }) => {
          if (isNewMovie) {
            handleAddNewMovie({...values, genres: values.genres.map(g=>{return  g.value }), 
              release_date: values.release_date.toISOString().substring(0, 10),
              vote_average: parseFloat(values.vote_average),
              runtime: Math.floor(values.runtime)
            })
          } else {
            console.log(values.release_date);
            handleUpdateMovie({...values, genres: values.genres.map(g=>{return  g.value }), 
              release_date: values.release_date.toISOString(),
              vote_average: parseFloat(values.vote_average),
              runtime: Math.floor(values.runtime)
            })
        }
        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        resetForm
      }) => (
    <form onSubmit={handleSubmit} className='movie-form'>
        <div className='error-text'>{hasBackendError ? errorMessage : ''}</div>
        <div className='movie-form-first-column'>
            <div className='movie-form-label'>title</div>
            <input className='movie-form-input' value={values.title} name="title" autoFocus={true} data-testid="titleInput" 
            onChange={handleChange}></input>
            <div className='error-label'>{errors.title && touched.title && errors.title}</div>
            <div className='movie-form-label'>movie url</div>
            <input className='movie-form-input' value={values.poster_path} name="poster_path" onChange={handleChange}
            placeholder="https://" data-testid="urlInput"></input>
            <div className='error-label'>{errors.poster_path && touched.poster_path && errors.poster_path}</div>
            <div className='movie-form-label'>genre</div>
            
            <MultiSelectInput
              className='movie-form-genre-input'
              name="genres"
              options={genreOptions}
              placeholder="Select Genre"
            />
            <div className='error-label'>{errors.genres && touched.genres && errors.genres}</div>
        </div>
        <div className='movie-form-second-column'>
            <div className='movie-form-label'>release date</div>
            <DatePickerField name="release_date"/>
            <div className='error-label'>{errors.release_date && touched.release_date && errors.release_date}</div>
            <div className='movie-form-label'>rating</div>
            <input className='movie-form-input' value={values.vote_average} name="vote_average" 
            data-testid="ratingInput" onChange={handleChange}></input>
            <div className='error-label'>{errors.vote_average && touched.vote_average && errors.vote_average}</div>
            <div className='movie-form-label'>runtime</div>
            <input className='movie-form-input' value={values.runtime} onChange={handleChange}
            data-testid="durationInput" name="runtime" ></input>
            <div className='error-label'>{errors.runtime && touched.runtime && errors.runtime}</div>
        </div>
        <div className='movie-form-textarea-column'>
            <div className='movie-form-label'>overview</div>
            <textarea className='movie-form-textarea movie-form-input' rows="5" data-testid="descriptionInput"
                    value={values.overview} name="overview" onChange={handleChange}></textarea>
                    <div className='error-label'>{errors.overview && touched.overview && errors.overview}</div>
        </div>
        <div className='movie-form-control-column'>
            <button className='movie-form-submit-button movie-form-button' type="submit" data-testid="submitButton">submit</button>
            <button className='movie-form-reset-button movie-form-button' type="button" data-testid="resetButton" onClick={() => resetForm()}>reset</button>
        </div>
    </form>
       )}
     </Formik>
    </div>
}

