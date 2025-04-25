import React from "react";
import Item from "../../components/Item";

export default () => {

    return (
        <section>
            <div className="mx-auto grid max-w-full grid-cols-[repeat(auto-fit,minmax(225px,1fr))] gap-8 p-8 lg:max-w-7xl">
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
            </div>
      </section>
    )
}