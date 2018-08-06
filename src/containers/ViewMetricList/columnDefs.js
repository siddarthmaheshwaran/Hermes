import React from 'react';

// import { formatDate } from 'util/format';
// import { sortDate as utilSortDate } from 'util/sort';
// import { goto } from 'util/goto';
// import { Icon } from '../../Components/Icon';
// import { Mode, RunStatus } from '../constants.js';

// const displayFormat = 'MMM D, YYYY';
// const parseFormat = 'MM/DD/YYYY HH:mm:ss';
//
// const sortCreatedDate = (a, b) => utilSortDate(a.myCreatedDate, b.myCreatedDate);
// const sortLastUpdatedDate = (a, b) => utilSortDate(a.myLastUpdatedDate, b.myLastUpdatedDate);

// const renderLatestRunDateTime = ({ data }) => {
//     if (data.myLatestRunDateTime) {
//         let statusIcon;
//
//         if (data.myLatestRunStatus === RunStatus.Success) {
//             statusIcon = <Icon className="success-icon" name="notice" size="20"/>;
//         } else if (data.myLatestRunStatus === RunStatus.Failure) {
//             statusIcon = <Icon className="failure-icon" name="alert" size="20"/>;
//         } else {
//             statusIcon = <Icon className="neutral-icon" name="notice" size="20"/>;
//         }
//
//         return (
//             <section className="run-status">
//                 { statusIcon } <span className="icon-label">{formatDate(data.myLatestRunDateTime, displayFormat)}</span>
//             </section>
//         )
//     }
//
//     return null;
// };

// // TODO: This needs more cleanup. Too prone to errors. Reduxify?
// const renderReportControls = (reportTypeMap) => {
//     return ({ data }) => {
//         let { myLatestRunStatus, myLatestReportRunID, myReportTypeID } = data;
//
//         let isLatestRunValid = myLatestReportRunID && myLatestRunStatus === RunStatus.Success;
//
//         let viewReport = () => {
//             let isIntSbS = myReportTypeID == reportTypeMap.interactiveSecondBySecond,
//                 isTuneIn = myReportTypeID == reportTypeMap.tuneIn,
//                 isAudMigration = myReportTypeID == reportTypeMap.audienceMigration,
//                 isReachFreq = myReportTypeID == reportTypeMap.reachAndFrequency,
//                 isDemo = process.env.DEMO;
//
//             if (isReachFreq) goto('/reports/visualizations/reach-frequency', { reportId: data.myID, runId: data.myLatestReportRunID })
//             if (isTuneIn) goto('/reports/visualizations/tune-in', { reportId: data.myID, runId: data.myLatestReportRunID })
//             if (isIntSbS) goto('/reports/visualizations/interactive-second-by-second', { reportId: data.myID, runId: data.myLatestReportRunID })
//             if (isAudMigration) goto('/reports/visualizations/audience-migration', { reportId: data.myID, runId: data.myLatestReportRunID })
//         };
//
//         return (
//             <section className="controls">
//                 <div className="edit-icon" onClick={ () => goto('/reports', { mode: Mode.update, reportId: data.myID }) }>
//                     <Icon name="edit" size="20"/>
//                     <label>Edit</label>
//                 </div>
//
//                 {
//                     isLatestRunValid && data.isExportable ?
//                         <div className="export-icon"
//                              onClick={() => window.open(`${window.location.origin}/Amp/map/generated-report/${data.myLatestReportRunID}`)}>
//                             <Icon name="export" size="20"/>
//                             <label>Export</label>
//                         </div>
//                         : null
//                 }
//
//                 {
//                     isLatestRunValid && data.isViewable ?
//                         <div className="tune-in-icon" onClick={ viewReport }>
//                             <Icon name="reports" size="18"/>
//                             <label>View</label>
//                         </div>
//                         : null
//                 }
//
//             </section>
//         );
//     };
// }

// const renderRunsToDate = ({ value, data }) => (
//     value > 0 ? <span className="hyperlink-styles" onClick={ () => goto('/reports', { mode: Mode.displayRuns, reportId: data.myID }) }>{ value }</span> : null
// );

// const truncateSchedule = ({ value }) => {
//     value = value || '';
//     let runOnce = new RegExp(/run once/i);
//     if (runOnce.test(value)){
//         return 'Run Once';
//     }
//     else {
//         return value.replace('Run ', '');
//     }
// };

export const ColumnDefs = () => {
    const defs = [
        {
            colId: 'space',
            suppressMenu: true,
            width: 15,
        },
        {
            colId: 'myName',
            headerName: 'Report Name',
            field: 'myName',
            width: 300,

        },
        {
            colId: 'myReportTypeName',
            headerName: 'Type',
            width: 300,
            field: 'myReportTypeName',
        },
        {
            colId: 'myDescription',
            headerName: 'Description',
            width: 300,
            field: 'myDescription',
        },
        {
            colId: 'myStatus',
            headerName: 'Status',
            field: 'myStatus',
            width: 100,
        }
    ];

    return defs;
};
