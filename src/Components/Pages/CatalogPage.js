import React, {useEffect, useState, useRef} from 'react'
import CatalogCardComponent from '../UIComponents/CatalogCardComponent';
import '../Styles/CatalogPage.css';
import CardSkeletonLoader from '../UIComponents/CardSkeletonLoader';

const CatalogPage = () => {
  //State as a container for fetched workouts
  const [fetchedWorkouts, setFetchedWorkouts] = useState([]);
  //State for search field
  const [searchWorkout, setSearchWorkout] = useState('');
  //State for dropdown
  const [filterDropdown, setFilterDropdown] = useState();
  //State for filter
  const [difficultyFilter, setDifficultyFilter] = useState('');
  //State for filter
  const [workoutTypeFilter, setWorkoutTypeFilter] = useState('');
  //State for filter
  const [targetMuscleFilter, setTargetMuscleFilter] = useState('');
  //State for skeleton loading
  const [skeletonLoading, setSkeletonLoading] = useState(true);
  //Reference for dropdown container
  const filterDropdownRef = useRef();

  useEffect(() =>  {
    //For fetching data
    const fetchDataWorkouts = async () => {
      try{
        const response = await fetch('http://fitplan.onlinewebshop.net/db_getWorkouts.php');
        const fetchedData = await response.json();
        setFetchedWorkouts(fetchedData);
        setSkeletonLoading(false);
      }
      catch (error){
        console.error(error);
        setSkeletonLoading(false);
      }
    }

    fetchDataWorkouts();
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if(filterDropdownRef.current && !filterDropdownRef.current.contains(e.target)){
        setFilterDropdown(false);
      }
    }
    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
  }, []);

  const toggleFilterDropdown = () => {
    setFilterDropdown(!filterDropdown);
  }

  return (
    <div className='catalog-page'>
      <div className='catalog-page__wrapper'>
        <div className='catalog-page__header'>
          <input type='text' placeholder='Workout Name...' className='catalog-page__input' onChange={(e) => setSearchWorkout(e.target.value)} />
          <div className='catalog-page__dropdown-filter-wrapper' ref={filterDropdownRef}>
            <div className='catalog-page__dropdown-filter-icon-wrapper' onClick={toggleFilterDropdown}>
              <i className="catalog-page__dropdown-filter-icon fa-solid fa-filter"></i>
            </div>
            {filterDropdown &&
              <div className='catalog-page__dropdown-wrapper'>
                <p className='catalog-page__dropdown-title'>Filter By :</p>
                <select onChange={(e) => setDifficultyFilter(e.target.value)} className='catalog-page__dropdown-filter first-child'>
                  <option value=''hidden>Difficulty</option>
                  <option value=''></option>
                  <option value='beginner'>Beginner</option>
                  <option value='intermediate'>Intermediate</option>
                  <option value='advanced'>advanced</option>
                </select>
                <select onChange={(e) => setWorkoutTypeFilter(e.target.value)} className='catalog-page__dropdown-filter second-child'>
                  <option value=''hidden>Workout Type</option>
                  <option value=''></option>
                  <option value='calisthenics'>Calisthenics</option>
                  <option value='weighted training'>Weighted training</option>
                  <option value='cardio'>Cardio</option>
                </select>
                <select onChange={(e) => setTargetMuscleFilter(e.target.value)} className='catalog-page__dropdown-filter third-child'>
                  <option value=''hidden>Target Muscle</option>
                  <option value=''></option>
                  <option value='chest'>Chest</option>
                  <option value='shoulders'>Shoulders</option>
                  <option value='back'>Back</option>
                  <option value='triceps'>Triceps</option>
                  <option value='biceps'>Biceps</option>
                  <option value='lats'>Lats</option>
                  <option value='core'>Core</option>
                  <option value='abs'>Abs</option>
                  <option value='obliques'>Obliques</option>
                  <option value='quadriceps'>Quadriceps</option>
                </select>
              </div>
            }
          </div>
        </div>
        <div className='catalog-page__body'>
          {skeletonLoading ?
            Array.from({length: 6}).map((_, index) => <CardSkeletonLoader key={index} />)
             :
            fetchedWorkouts.filter((workouts) =>{
              return (
                (!searchWorkout || workouts.name.toLowerCase().includes(searchWorkout.toLowerCase())) &&
                (!difficultyFilter || workouts.difficulty.toLowerCase() === difficultyFilter.toLowerCase()) &&
                (!workoutTypeFilter || workouts.category.toLowerCase() === workoutTypeFilter.toLowerCase()) &&
                (!targetMuscleFilter || workouts.primary_target_muscle.toLowerCase() === targetMuscleFilter.toLowerCase())
            );
            }).map((workouts) => (
               <CatalogCardComponent 
                key={workouts.id}
                id={workouts.id}
                img={workouts.image_url}
                name={workouts.name}
                description={workouts.description}
                difficulty={workouts.difficulty}
             />
            ))
            }
        </div>
      </div>
    </div>
  )
}

export default CatalogPage
