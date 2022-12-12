import Box from '@mui/material/Box';
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

const AnimalList = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // const fetchData = async () => {
        //   let list = [];
        //   try {
        //     const querySnapshot = await getDocs(collection(db, "animals"));
        //     querySnapshot.forEach((doc) => {
        //       list.push({ id: doc.id, ...doc.data() });
        //     });
        //     setData(list);
        //     console.log(list);
        //   } catch (err) {
        //     console.log(err);
        //   }
        // };

        // fetchData();      

        // LISTEN (REALTIME)
        const unsub = onSnapshot(
            collection(db, "animals"),
            (snapShot) => {
                let list = [];
                snapShot.docs.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() });
                });
                setData(list);
            },
            (error) => {
                console.log(error);
            }
        );

        return () => {
            unsub();
        };
    }, []);

    // Animal List Column Names
    const columns = [
        {
            field: 'accession number',
            headerName: 'Accession Number',
            width: 150,
            description:
                'The number that idenitifies the animal.',
        },
        { field: 'name', headerName: 'Name' },
        { field: 'gender', headerName: 'Gender' },
        {
            field: 'assessor',
            headerName: 'Assessed By',
            width: 150,
            description:
                'The name of the assessor.',
        },
        { field: 'group', headerName: 'Group' },
    ];


    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "animals", id));
            setData(data.filter((item) => item.id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to="/users/test" style={{ textDecoration: "none" }}>
                            <div className="viewButton">View</div>
                        </Link>
                        <div
                            className="deleteButton"
                            onClick={() => handleDelete(params.row.id)}
                        >
                            Delete
                        </div>
                    </div>
                );
            },
        },
    ];

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                className="datagrid"
                rows={data}
                columns={columns.concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[9]}
            />
        </Box>
    );
}

export default AnimalList;