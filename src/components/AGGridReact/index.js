
import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import './styles.scss';


// import 'ag-grid/dist/styles/ag-grid.css';
// import 'ag-grid/dist/styles/ag-theme-balham.css';

class Grid extends React.Component {
    // componentWillMount () {
    //     // set gridOptions and let parent gridOptions override/merge defaults
    //     this.gridOptions = Object.assign({
    //         rowHeight: 32,
    //         headerHeight: 32,
    //         rowData: null,
    //         columnDefs: null,
    //         enableSorting: true,
    //         enableColResize: true,
    //         enableFilter: false,
    //         suppressLoadingOverlay: true,
    //
    //         onGridReady: (params) => {
    //             this.api = params.api;
    //             this.columnApi = params.columnApi;
    //             // sizeColumnsToFit if flagged to true
    //             if (this.props.sizeColumnsToFit) {
    //                 params.api.sizeColumnsToFit();
    //             }
    //         },
    //
    //         onComponentStateChanged: () => {
    //             if (this.props.sizeColumnsToFit) {
    //                 this.api.sizeColumnsToFit();
    //             }
    //
    //             if (this.props.externalFilter) {
    //                 this.api.onFilterChanged();
    //             }
    //         }
    //     }, this.props.gridOptions);
    // }

    render () {

        const { props } = this;
        if(props.rowData.length === 0)
            return(
                <div>loading........</div>
            );
        return (
            <div style = { {  border: '5px solid red' } }>
                <AgGridReact  gridAutoHeight = {true}  columnDefs = {props.columnDefs} rowData = {props.rowData} />
            </div>
        );
    }
}

// gridOptions={props.gridOptions}

// gridAutoHeight={true}
//
//
// height: '100%',
// gridOptions={props.gridOptions}

    Grid.defaultProps = {
    sizeColumnsToFit: false,
    externalFilter: false
};

export default Grid;










