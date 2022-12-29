import Box from '@mui/material/Box';
import {animalColumns} from "../animalListSource";
import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import {
    collection,
    getDocs,
    deleteDoc,
    doc,
    onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import { ref } from 'firebase/storage';

const AnimalList = () => {
    const [animal, setAnimal] = useState([]);
    const [loading, setLoading] = useState([]);

    function getAnimals() {
        setLoading(true);
        ref.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setSchools(items);
            setLoading(false);
        });
    }

    useEffect(() => {
        getAnimals();
    }, []);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <React.Fragment>
            <div>
                {animal.map((data) => (
                    <>
                        <h2>{data.name}</h2>
                        <p>{data.gender}</p>
                        <p>{data.species}</p>
                        <p>{data.group}</p>
                    </>
                ))}
            </div>
        </React.Fragment>
        // <Box sx={{ height: 400, width: '100%' }}>
        //     <DataGrid
        //         className="datagrid"
        //         rows={animal}
        //         columns={animalColumns}
        //         pageSize={9}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
        //         rowsPerPageOptions={[9]}
        //     />
        // </Box>
    );
}

export default AnimalList;