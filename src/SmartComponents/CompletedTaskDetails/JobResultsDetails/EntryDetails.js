import React from 'react';
import propTypes from 'prop-types';
import { Grid, GridItem } from '@patternfly/react-core';

const EntryDetails = ({ entry }) => {
  const { detail, key, summary } = entry;

  const renderResolutionDetails = (content, type, classname) => {
    if (!Array.isArray(content)) {
      content = [content];
    }
    return content.map((item, index) => {
      let key = `${type}-${index}`;
      return (
        <div key={key}>
          {index > 0 ? (
            <span>
              <br />
            </span>
          ) : null}
          <span className={classname}>
            {item.type
              ? `[${item.type}] ${
                  item.type === 'command' && Array.isArray(item.context)
                    ? item.context.join(' ')
                    : item.context
                }`
              : `${item.context}`}
          </span>
        </div>
      );
    });
  };

  const createGrid = (itemOneContent, itemTwoContent) => {
    return (
      <Grid hasGutter className="entry-detail-title">
        <GridItem span={2} className="entry-detail-content">
          {itemOneContent}
        </GridItem>
        <GridItem
          xl2={5}
          xl={5}
          l={6}
          m={7}
          sm={8}
          style={{ whiteSpace: 'pre-line' }}
        >
          {typeof itemTwoContent === 'function'
            ? itemTwoContent()
            : itemTwoContent}
        </GridItem>
      </Grid>
    );
  };

  const renderDetails = () => {
    return (
      <React.Fragment>
        {createGrid('Summary', summary)}
        {detail?.diagnosis && detail?.diagnosis?.[0]?.context !== ''
          ? createGrid(
              'Diagnosis',
              renderResolutionDetails(detail.diagnosis, 'diagnosis')
            )
          : null}
        {detail?.remediations && detail?.remediations?.[0]?.context !== ''
          ? createGrid(
              'Remediation',
              renderResolutionDetails(
                detail.remediations,
                'remediations',
                'remediations-font-family'
              )
            )
          : null}
        {createGrid('Key', key)}
      </React.Fragment>
    );
  };

  return <div>{renderDetails()}</div>;
};

EntryDetails.propTypes = {
  entry: propTypes.object,
  taskConstantMapper: propTypes.string,
};

export default EntryDetails;
