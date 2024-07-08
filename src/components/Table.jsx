import React, { useState } from "react";
import ModalDelete from "./ModalDelete";
import ModalEdit from "./ModalEdit";
import ModalAdd from "./ModalAdd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Table({
    headers,
    data,
    endPointModal,
    inputData,
    titleModal,
    identitasColumn,
    opsiButton,
    columnForTd = {}
}) {
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const [endPointToSend, setEndPointToSend] = useState({});
    const navigate = useNavigate();

    function handleModalDelete(id) {
        const endpointDelete = endPointModal['delete'];
        const endpointDetail = endPointModal['data_detail'];
        const replaceUrlDelete = endpointDelete.replace("{id}", id);
        const replaceUrlDetail = endpointDetail.replace("{id}", id);
        const endpointReplaced = {
            "data_detail": replaceUrlDetail,
            "delete": replaceUrlDelete,
        };
        setEndPointToSend(endpointReplaced);
        setIsModalDeleteOpen(true);
    }

    function handleModalEdit(id) {
        const endPointEdit = endPointModal['update'];
        const endPointDetail = endPointModal['data_detail'];
        const replaceUrlEdit = endPointEdit.replace("{id}", id);
        const replaceUrlDetail = endPointDetail.replace("{id}", id);
        const endPointReplaced = {
            "data_detail": replaceUrlDetail,
            "update": replaceUrlEdit
        };

        console.log(replaceUrlEdit);

        setEndPointToSend(endPointReplaced);
        setIsModalEditOpen(true);
    }

    function handleModalAdd() {
        setIsModalAddOpen(true);
    }

    function handleRestore(id) {
        const endpointRestore = endPointModal['restore'].replace("{id}", id);
        axios.put(endpointRestore, null, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
        .then(res => {
            window.location.reload();
        })
        .catch(err => {
            console.log(err)
            if (err.response.status === 401) {
                navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
            }
        })
    }
    
    function handlePermanentDelete(id) {
        const endpointPermanentDelete = endPointModal['delete_permanent'].replace("{id}", id);
        axios.delete(endpointPermanentDelete, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
        .then(res => {
            window.location.reload()
        })
        .catch(err => {
            console.log(err)
            if (err.response.status === 401) {
                navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
            }
        })
    }
    

    const instance = axios.create({
        baseURL: 'http://localhost:8000',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    });

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-8 bg-gray-50 dark:bg-gray-800">
            <div className="flex justify-end mb-4">
                {opsiButton.includes("create") && (
                    <button type="button" onClick={handleModalAdd} className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 rounded-md">
                        Create
                    </button>
                )}
                {opsiButton.includes("trash") && (
                    <Link to={'/stuff/trash'} className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800 rounded-md ml-3">
                        Trash
                    </Link>
                )}
            </div>

            <table className="min-w-full bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                <thead className="bg-gray-200 dark:bg-gray-700">
                    <tr>
                        {headers.map((header, index) => (
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400" key={index}>
                                {header}
                            </th>
                        ))}
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"></th>
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {data.map((item, index) => (
                        <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{index + 1}.</td>
                            {Object.entries(columnForTd).map(([key, value]) => (
                                <td key={key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                    {!value ? item[key] : item[key.replace(/[!&*;:]/g, '')] ? item[key.replace(/[!&*;:]/g, '')][value] : '0'}
                                </td>
                            ))}
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                {opsiButton.includes("edit") && (
                                    <button 
                                        type="button" 
                                        onClick={() => handleModalEdit(item.id)} 
                                        className="inline-flex items-center px-3 py-1.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 rounded-md"
                                    >
                                        Edit
                                    </button>
                                )}
                                {opsiButton.includes("delete") && (
                                    <button 
                                        type="button" 
                                        onClick={() => handleModalDelete(item.id)} 
                                        className="inline-flex items-center px-3 py-1.5 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 rounded-md ml-3"
                                    >
                                        Delete
                                    </button>
                                )}
                                {opsiButton.includes("restore") && (
                                    <button onClick={() => handleRestore(item.id)} type="button" className="inline-flex items-center px-3 py-1.5 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 rounded-md ml-3">
                                        Restore
                                    </button>
                                )}
                                {opsiButton.includes("permanentDeletes") && (
                                    <button onClick={() => handlePermanentDelete(item.id)} type="button" className="inline-flex items-center px-3 py-1.5 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 rounded-md ml-3">
                                        Permanent Delete
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ModalDelete isOpen={isModalDeleteOpen} onClose={() => setIsModalDeleteOpen(false)} endPoint={endPointToSend} identitasColumn={identitasColumn} />
            <ModalEdit isOpen={isModalEditOpen} onClose={() => setIsModalEditOpen(false)} endPoint={endPointToSend} inputData={inputData} />
            <ModalAdd isOpen={isModalAddOpen} onClose={() => setIsModalAddOpen(false)} endPoint={endPointModal} inputData={inputData} titleModal={titleModal} />
        </div>
    );
}
