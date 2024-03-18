import React, { useEffect, useState } from 'react';
import Nav from "./nav";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./footer";
import ItemCard from "./ItemCard";
import axios from "axios";
import Pagination from "react-js-pagination";
import Paging from './paging';


function Main() {
    const postsPerPage = 8;
    const [page, setPage] = useState(1);
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const offset = (page - 1) * postsPerPage;
    const limit =  postsPerPage;

    const endPoint = "http://localhost:8000/api/post/posts";
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [alldata, setAlldata] = useState([]);
    let Dummy = [];

    async function loadAllPosts() {
        try {
            const response = await axios.get(endPoint);
            if (response.status === 200) {
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].post_status == true) {
                        Dummy.push(response.data[i]);
                    }
                }
                setAlldata(response.data);
                setPosts(Dummy);
                setFilteredPosts(Dummy);
            } else {
                alert("Load Failed");
            }
        } catch (error) {
            alert("Totally Failed: " + error.message);
        }
    }
    function searchItem() {
        console.log(search)
        try {
            const filteredPosts = alldata.filter(
                (post) =>
                    post.post_status === true &&
                    post.title.toLowerCase().includes(search.toLowerCase())
            );
            setPosts(filteredPosts);
            setPage(1); // reset page to 1 when search is performed
        } catch (error) {
            alert("Totally Failed: " + error.message);
        }
    }

    const [sizeSort, setSizeSort] = useState(false);

    const [priceSort, setPriceSort] = useState(false);


    function sortPostsBySize() {
        const sortedPosts = [...posts].sort((a, b) => a.size - b.size);
        setPosts(sizeSort ? sortedPosts.reverse() : sortedPosts);
        setPage(1);
        setSizeSort(!sizeSort);
    }

    function sortPostsByPrice() {
        const sortedPosts = [...posts].sort((a, b) => a.price - b.price);
        setPosts(priceSort ? sortedPosts.reverse() : sortedPosts);
        setPage(1);
        setPriceSort(!priceSort);
    }

    useEffect(() => {
        loadAllPosts();
    }, []);

    const [search, setSearch] = useState('');

    return <div>
        <Nav />
        <h1 id="mainETC">
            <form className="d-flex" role="search">
                <input id="search" className="form-control me-2" type="search" value={search} placeholder="Search by title" aria-label="Search" onChange={(e) => {
                    setSearch(e.target.value);
                }} />
                <button
                    id="searchSumbit"
                    className="btn btn-outline-success"
                    type="button"
                    onClick={searchItem}
                >
                    Search
                </button>
                <button type="button" className ="btn btn-outline-success" onClick={sortPostsBySize}>
                    {sizeSort ? "size ↓ " : "size ↑"}
                </button>
                <button type="button" className ="btn btn-outline-success" onClick={sortPostsByPrice}>
                    {priceSort ? "price ↓" : "price ↑"}
                </button>
            </form>
        </h1>

        <div id="cardContainer" className="bg-light">
            <div className="container">

                <div className="row">
                    {posts.slice(offset, offset + limit).map((post) => (
                        <ItemCard
                            img={post.img}
                            key={post._id}
                            id={post._id}
                            title={post.title}
                            status={post.condition}
                            size={post.size}
                            price={post.price}
                            likes={post.likes.length}

                        />
                    ))}
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <Paging
                            page={page}
                            count={posts.length}
                            setPage={setPage}
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>;
}
export default Main;

