import { useState } from "react";
import GridView from "./GridView";
import ListView from "./ListView";
import ExpandedItemView from "./ExpandedItemView";

export default function SearchResults({ data, gridMode }) {
    const [expandedView, setExpandedView] = useState(null);

    const handleOpenExpandedView = (item) => {
        setExpandedView(item);
    };

    const handleCloseExpandedView = () => {
        setExpandedView(null);
    };

    return (
        <div>
            {gridMode ? (
                <GridView data={data} onItemClick={handleOpenExpandedView} />
            ) : (
                <ListView data={data} onItemClick={handleOpenExpandedView} />
            )}

            {expandedView && (
                <ExpandedItemView
                    item={expandedView}
                    onClose={handleCloseExpandedView}
                />
            )}
        </div>
    );
}
