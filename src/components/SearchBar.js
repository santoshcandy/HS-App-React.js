import React, { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';
import "../style/searchbar.css"
const ServiceSearchBar = ({ onResults }) => {
    const [query, setQuery] = useState('');
    
    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/services/search/`, {
                params: { name: query }
            });
            onResults(response.data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    return (
        <Form className="search-bar" onSubmit={handleSearch}>
            <FormControl
                type="text"
                placeholder="Search for services..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="search-input"
            />
            <Button type="submit" className="search-button">Search</Button>
        </Form>
    );
};

export default ServiceSearchBar;
