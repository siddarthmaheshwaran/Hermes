import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import { viewMetricAction } from "../../services/actionCreators/viewMetricActions";
import { ColumnDefs } from './columnDefs';
import Grid from '../../components/AGGridReact';
import POCGrid from '../../components/AGGridReactPOC';


class ViewMetricList extends Component{
    componentDidMount(){
        this.props.viewMetricAction();
    }

    gridProps = {
        gridOptions: {
            enableFilter: true,
            suppressScrollOnNewData: true
        },
        sizeColumnsToFit: true,
        externalFilter: true,
        deltaRowDataMode: true
    };

    onGridReady(params) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;

        this.gridApi.sizeColumnsToFit();
    }

    renderGrid(field) {
        return (
            <div className="reports-grid" >
                <label>{field.label}</label>
                <input />
                <div className="grid-body">
                    <Grid
                        columnDefs={field.columnDefs()}
                        rowData={field.rowData}
                        onGridReady={field.onGridReady}>
                    </Grid>
                </div>
            </div>
        );
    }

    // gridOptions={field.gridOptions}
    render(){
        return (
            <form >
                <h1>View Metric Validation</h1>
                <Field
                    label="Title For Post"
                    name="title"
                    columnDefs={ColumnDefs}
                    rowData={_.toArray(this.props.viewMetricLocal)}
                    onGridReady={this.onGridReady}
                    component={this.renderGrid}
                />
            </form>
        );
    }
}
// gridOptions={this.gridProps.gridOptions}

const mapStateToProps = (state) => {
    return ({
        viewMetricLocal: state.viewMetricList.reports,
    });
};

export default reduxForm({
    form: 'ViewMetricListForm'
})(connect(mapStateToProps, { viewMetricAction })(ViewMetricList));



















// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { Field, reduxForm } from 'redux-form';
// import { viewMetricAction } from "../../services/actionCreators/viewMetricActions";
// import './styles.scss';
// import { ColumnDefs } from './columnDefs';
// import AgGridReact from '../../components/AGGridReact';
//
//
// class ViewMetricList extends Component{
//     constructor(props) {
//         super(props);
//
//         this.onGridReady = this.onGridReady.bind(this);
//         this.createColumnDefs = this.createColumnDefs.bind(this);
//         this.createRowData = this.createRowData.bind(this);
//         // this.gridOptions = this.gridOptions.bind(this);
//
//         this.state = {
//             showGrid: true,
//             gridOptions: {
//                 context: {
//                     componentParent: this
//                 }
//             },
//
//         };
//     }
//
//     // gridOptions()
//     // {
//     //     return(
//     //         {gridOptions: {
//     //                 context: {
//     //                     componentParent: this
//     //                 }
//     //             }}
//     //     )
//     // }
//
//      createColumnDefs() {
//         return [
//             {headerName: "Row", field: "row", width: 100},
//             {
//                 headerName: "Square",
//                 field: "value",
//                 editable: true,
//                 colId: "square",
//                 width: 100
//             },
//             {
//                 headerName: "Cube",
//                 field: "value",
//                 colId: "cube",
//                 width: 100
//             },
//             {
//                 headerName: "Row Params",
//                 field: "row",
//                 colId: "params",
//                 width: 215
//             },
//             {
//                 headerName: "Currency",
//                 field: "currency",
//                 colId: "currency",
//                 width: 135
//             },
//             {
//                 headerName: "Child/Parent",
//                 field: "value",
//                 colId: "params",
//                 width: 120
//             }
//         ];
//     }
//
//      createRowData() {
//         let rowData = [];
//
//         for (let i = 0; i < 15; i++) {
//             rowData.push({
//                 row: "Row " + i,
//                 value: i,
//                 currency: 1 + Number(Math.random()).toFixed(2)
//             });
//         }
//
//         return rowData;
//     }
//
//         componentDidMount(){
//         this.props.viewMetricAction();
//     }
//
//     onGridReady(params) {
//         this.gridApi = params.api;
//         this.columnApi = params.columnApi;
//
//         this.gridApi.sizeColumnsToFit();
//     }
//
//     renderGrid(field) {
//         return (
//             <div className="reports-grid" >
//                 <label>{field.label}</label>
//                 <input />
//                 <div className="grid-body">
//                     <AgGridReact
//                         // properties
//                         columnDefs={field.columnDefs()}
//                         rowData={field.rowData}
//                         gridOptions={field.gridOptions}
//                         onGridReady={field.onGridReady}>
//                     </AgGridReact>
//                 </div>
//             </div>
//         );
//     }
//
//     //    renderGrid(){
// //         return(
// //             <Grid { ...this.gridProps } rowData={_.toArray(this.props.reportsLocal)} />
// //     )
// //     }
// //
//
//     render(){
//         return (
//             <form >
//                 <h1>View Metric Validation</h1>
//                 <Field
//                     label="Title For Post"
//                     name="title"
//                     columnDefs={ColumnDefs}
//                     rowData={_.toArray(this.props.viewMetricsLocal)}
//                     gridOptions={this.state.gridOptions}
//                     onGridReady={this.onGridReady}
//                     component={this.renderGrid}
//                  />
//             </form>
//         );
//     }
// }
//
// //
//
// const mapStateToProps = (state) => {
//     return ({
//         viewMetricsLocal: state.viewMetricList.reports,
//         state: state
//     });
// };
//
// export default reduxForm({
//     form: 'ViewMetricListForm'
// })(connect(mapStateToProps, { viewMetricAction })(ViewMetricList));
//
// //
// //
// // import { connect } from "react-redux";
// // import { AgGridReact } from 'ag-grid-react';
// //
// // import Grid from '../../components/AGGridReact';
// // //
// // // import 'ag-grid/dist/styles/ag-grid.css';
// // // import 'ag-grid/dist/styles/ag-theme-balham.css';
// //
// //
// // import { viewMetricAction } from "../../services/actionCreators/viewMetricActions";
// // import { Field, reduxForm } from 'redux-form';
// // // import {menuItems} from "../../../Reports/List/menuItems";
// // // import {ColumnDefs} from "../../../Reports/List/columnDefs";
// //
// // import { ColumnDefs } from './columnDefs';
// //
// // // import './styles.scss';
// //
// // class ViewMetricList extends Component
// // {
// //     constructor(props) {
// //         super(props);
// //
// //         // this.state = {
// //         //     showGrid: true,
// //         //     gridOptions: {
// //         //         context: {
// //         //             componentParent: this
// //         //         }
// //         //     },
// //         //
// //         // };
// //     }
// //
// //     componentWillMount(){
// //         // this.gridOptions = Object.assign({
// //         //         rowHeight: 32,
// //         //         headerHeight: 32,
// //         //         rowData: null,
// //         //         columnDefs: null,
// //         //         enableSorting: true,
// //         //         enableColResize: true,
// //         //         enableFilter: false,
// //         //         suppressLoadingOverlay: true,
// //         //
// //         //         // onCellClicked: this.onMenuClick,
// //         //
// //         //         onGridReady: (params) => {
// //         //             this.api = params.api;
// //         //             this.columnApi = params.columnApi;
// //         //             // sizeColumnsToFit if flagged to true
// //         //             if (this.props.sizeColumnsToFit) {
// //         //                 params.api.sizeColumnsToFit();
// //         //             }
// //         //         },
// //         //
// //         //         // onComponentStateChanged: () => {
// //         //         //     if (this.props.sizeColumnsToFit) {
// //         //         //         this.api.sizeColumnsToFit();
// //         //         //     }
// //         //         //
// //         //         //     if (this.props.externalFilter) {
// //         //         //         this.api.onFilterChanged();
// //         //         //     }
// //         //         // }
// //         //
// //         //     },
// //         //     //     gridOptions: {
// //         //     //     enableFilter: true,
// //         //     //         isExternalFilterPresent: () => true,
// //         //     //         // doesExternalFilterPass: this.doesExternalFilterPass,
// //         //     //         suppressScrollOnNewData: true
// //         //     // }
// //         // );
// //     }
// //
// //     // gridProps = {
// //     //     menuColId: 'myName',
// //     //     menuItems: (data) => menuItems(data, this.props.reportTypeMap),
// //     //     columnDefs: ColumnDefs(this.props.reportTypeMap),
// //     //     gridOptions: {
// //     //         enableFilter: true,
// //     //         isExternalFilterPresent: () => true,
// //     //         doesExternalFilterPass: this.doesExternalFilterPass,
// //     //         suppressScrollOnNewData: true
// //     //     },
// //     //     sizeColumnsToFit: true,
// //     //     externalFilter: true,
// //     //     deltaRowDataMode: true
// //     // };
// //
// //
// //     componentDidMount(){
// //         // this.props.viewMetricAction();
// //     }
// //
// //
// //     ColumnDefs = () => {
// //         return [
// //             {
// //                 colId: 'myID',
// //                 headerName: 'Report ID',
// //                 field: 'myID',
// //                 width: 100,
// //                 cellStyle: { 'text-align': 'left' },
// //                 suppressMenu: true,
// //                 enableCellChangeFlash: true
// //             },
// //             {
// //                 colId: 'myName',
// //                 headerName: 'Report Name',
// //                 field: 'myName',
// //                 width: 420,
// //                 cellStyle: { 'text-align': 'left' },
// //                 suppressMenu: true,
// //                 enableCellChangeFlash: true
// //             },
// //             {
// //                 colId: 'myReportTypeName',
// //                 headerName: 'Type',
// //                 field: 'myReportTypeName',
// //                 cellStyle: { 'text-align': 'left' },
// //                 suppressMenu: true,
// //                 enableCellChangeFlash: true
// //             },
// //             {
// //                 colId: 'myDescription',
// //                 headerName: 'Description',
// //                 field: 'myDescription',
// //                 cellStyle: { 'text-align': 'left' },
// //                 suppressMenu: true,
// //                 enableCellChangeFlash: true
// //             },
// //             // {
// //             //     colId: 'myLatestRunDateTime',
// //             //     headerName: 'Latest Run',
// //             //     field: 'myLatestRunDateTime',
// //             //     cellStyle: { 'text-align': 'left' },
// //             //     suppressMenu: true,
// //             //     comparator: utilSortDate,
// //             //     cellRendererFramework: renderLatestRunDateTime,
// //             //     enableCellChangeFlash: true
// //             // },
// //             {
// //                 colId: 'myStatus',
// //                 headerName: 'Status',
// //                 field: 'myStatus',
// //                 width: 160,
// //                 cellStyle: { 'text-align': 'left' },
// //                 suppressMenu: true,
// //                 enableCellChangeFlash: true,
// //                 valueFormatter: ({ value }) => {
// //                     return value ? value.substring(0,1).toUpperCase() + value.slice(1).toLowerCase(): '';
// //                 }
// //             },
// //
// //         ];
// //     };
// //
// //     onGridReady(params) {
// //         this.gridApi = params.api;
// //         this.columnApi = params.columnApi;
// //
// //         this.gridApi.sizeColumnsToFit();
// //     }
// //     // renderGrid1(){
// //     //     if (this.props.reportsLocal != null) {
// //     //         let val = _.toArray(this.props.reportsLocal);
// //     //         console.log("PROPS:" + val);
// //     //         console.log("PROPS:" + this.props.reportsLocal);
// //     //     }
// //     //     let columndefVar = null;
// //     //     if (this.ColumnDefs === null) {
// //     //         columndefVar = [];
// //     //     }
// //     //     else{
// //     //         columndefVar = this.ColumnDefs();
// //     //     }
// //     //     return(
// //     //         <div className="ag-theme-balham"
// //     //     style={{
// //     //         height: '500px',
// //     //             width: '600px' }} >
// //     // <AgGridReact
// //     //     gridOptions={this.gridOptions}
// //     //     columnDefs={ columndefVar }
// //     //     rowData={_.toArray(this.props.reportsLocal)}
// //     //     onGridReady={this.onGridReady}
// //     //     showGrid={this.state.showGrid}
// //     //     />
// //     //     </div>
// //     // )
// //     // }
// //
// //     gridProps = {
// //         menuColId: 'myName',
// //         columnDefs: ColumnDefs(),
// //         gridOptions: {
// //             enableFilter: true,
// //             isExternalFilterPresent: () => true,
// //             // doesExternalFilterPass: this.doesExternalFilterPass,
// //             suppressScrollOnNewData: true
// //         },
// //         sizeColumnsToFit: true,
// //         externalFilter: true,
// //         deltaRowDataMode: true
// //     };
// //
//  //    renderGrid(){
// //         return(
// //             <Grid { ...this.gridProps } rowData={_.toArray(this.props.reportsLocal)} />
// //     )
// //     }
// //
// //     render(){
// //         // return(
// //         //     <div>
// //         //         <h3>ABC-Anitha</h3>
// //         //         <Field
// //         //         name = "reportsGrid"
// //         //         component= {this.renderGrid1.bind(this)}
// //         //         />
// //         //     </div>
// //         // );
// //         return(
// //          <div>
// //             <h3>View Metric Validation</h3>
// //         </div>
// //     );
// //
// //     }
// // }
// // // <Grid { ...this.gridProps } rowData={_.toArray(this.props.reportsLocal)} />
// // // const mapDispatchToProps = (dispatch) => {
// // //     return {
// // //         <h1>View Metric Validation</h1>List: () => dispatch(viewMetricAction())
// // //     }
// // // };
// //
// // const mapStateToProps = (state) => {
// //     return ({
// //         selectedReportID: state.selctedReportID,
// //         reportsLocal: state.reportsList.reports,
// //         state: state
// //     });
// // };
// //
// // export default reduxForm({
// //     form: 'ViewMetricListForm'
// // })(connect(mapStateToProps, { viewMetricAction })(ViewMetricList));
// //
