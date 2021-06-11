import React, { useEffect, useState } from "react";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import AddItem from "../../Components/AddItem/AddItem";
import { getItems, filteredItems } from "../../Redux/actions/item";
import { Form, Button, DropdownButton, Dropdown } from "react-bootstrap";
import "./CardList.css";

function Products() {
    const items = useSelector((state) => state.itemReducer.items);
    const [searchName, setSearchName] = useState("");
    const [searchCategory, setSearchCategory] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getItems());
        // eslint-disable-next-line
    }, []);

    return (
        <div className="flex-container wrap">
            <AddItem />

            <Form className="d-flex" id="fo_rm">
                <input
                    placeholder="Search here..."
                    type="text"
                    id="searh_bar"
                    onChange={(e) => {
                        setSearchName(e.target.value);
                        setSearchCategory(e.target.value);
                    }}
                />
                <Button
                    variant="primary"
                    onClick={() => dispatch(filteredItems(searchName))}
                >
                    Search
                </Button>
                <DropdownButton
                    id="dropdown-basic-button"
                    className="drop_but"
                    title="Category"
                >
                    <Dropdown.Item onClick={() => setSearchCategory("face")}>
                        Face
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setSearchCategory("eye")}>
                        Eye
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setSearchCategory("lip")}>
                        Lip
                    </Dropdown.Item>
                </DropdownButton>
            </Form>
            <div id="card_list_c">
                {items
                    .filter(
                        (el) =>
                            el.title
                                .toLowerCase()
                                .includes(searchName.toLowerCase()) ||
                            el.category
                                .toLowerCase()
                                .includes(searchCategory.toLowerCase())
                    )
                    .map((item, index) => (
                        <ProductCard item={item} key={index} />
                    ))}
            </div>
        </div>
    );
}

export default Products;
