import React, {Fragment, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import classNames from 'classnames';
import {
  ButtonPrimary,
  List,
  NavPill,
  NavPillList,
  NavPillListItem,
  NavPillPanel,
  Table,
  TableRow,
  TableHeaderCell,
  TableCell,
  Type,
  spacer16,
  spacer32,
  Tag, FormGroup, FormInput, Banner,
} from '@spotify-internal/encore-web';
import {
  CERTIFICATION_STATUSES,
  CERTIFICATION_ACTIONS_READABLE,
  CERTIFICATION_FEATURES,
  CERTIFICATION_ACTIONS,
} from '../utils/Constants';
import Utils from '../utils/Utils';
import './CertificationReport.less';
import {addComment} from '../api/api';

const CertificationReport = ({
  getCertificationReport,
  certificationReport,
  isAdmin,
  handleCertificationStatusChange,
  // TODO: add 'Delete certification' button, with an 'Are you sure?' DialogConfirmation: handleCertificationDelete,
}) => {
  const { reset, register, handleSubmit } = useForm();
  useEffect(() => {
    reset({
      comment: '',
    });
  }, [certificationReport]);

  const [activeTab, setActiveTab] = useState(0);
  const {
    status: certificationStatus,
    certificationId,
    brand,
    model,
    productId,
    type,
    clientId,
    platform,
    version,
    dateRange,
    certificationGroups = [],
    activityLog = [],
    features = [],
  } = certificationReport;

  const [bannerInfo, setBannerInfo] = useState({
    show: false,
    color: 'negative',
    message: '',
  });

  const onSubmit = (formData) => {
    addComment(
      certificationId,
      formData.comment,
    )
      .then((response) => {
        if (response && response.status === 201) {
          setBannerInfo({
            show: true,
            message: 'Comment posted!',
            color: 'positive',
          });
          getCertificationReport(certificationId);
        }
      })
      .catch(() => {
        setBannerInfo({
          show: true,
          message: 'Failed to post comment',
          color: 'negative',
        });
      });
  };

  const navPillContent = [
    <NavPillPanel id="test-results" aria-labelledby="test-results-tab">
      <Type as="h2" variant={Type.heading3}>
        Test Results
      </Type>
      {certificationGroups.map((group) => (
        <div key={group.title} className="certificationReportTestGroup">
          <p className="certificationReportTestGroupTitle">{group.title}</p>
          <Table>
            <colgroup>
              <col width="20%" />
              <col width="10%" />
              <col width="20%" />
              <col width="20%" />
              <col width="10%" />
              <col width="20%" />
            </colgroup>
            <thead>
              <TableRow>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Value</TableHeaderCell>
                <TableHeaderCell>Error</TableHeaderCell>
                <TableHeaderCell>Duration (sec)</TableHeaderCell>
                <TableHeaderCell>Date</TableHeaderCell>
              </TableRow>
            </thead>
            <tbody>
              {group.certificationReportTests.map(
                ({ name, status, value, error, duration, date }) => {
                  return (
                    <TableRow key={group.title + name}>
                      <TableCell>{name}</TableCell>
                      <TableCell
                        className={classNames(
                          'testResult',
                          status === 'PASS' && 'testResultSuccess',
                          status === 'FAIL' && 'testResultFailed',
                        )}
                      >
                        {status}
                      </TableCell>
                      <TableCell>{value}</TableCell>
                      <TableCell>{error}</TableCell>
                      <TableCell>{duration}</TableCell>
                      <TableCell className="certificationTestDate">
                        {date && Utils.formattedTimeStamp(date)}
                      </TableCell>
                    </TableRow>
                  );
                },
              )}
            </tbody>
          </Table>
          {group.certificationReportFiles
            ? group.certificationReportFiles.map((file) => (
              <div key={file.name}>
                <p>{file.name}</p>
                {file.type === 'image' ? (
                  <img src={file.url} />
                ) : (
                  <a target="_blank" href={file.url}>
                    Uploaded file
                  </a>
                )}
              </div>
            ))
            : null}
        </div>
      ))}
    </NavPillPanel>,
    <NavPillPanel id="comments" aria-labelledby="comments-tab">
      <Type as="h2" variant={Type.heading3}>
        Comments
      </Type>
      {bannerInfo.show && (
        <div className={'errorBannerOrganizationEdit'}>
          <Banner colorSet={bannerInfo.color} onClose={() => setBannerInfo({show: false})}>
            {bannerInfo.message}
          </Banner>
        </div>)
      }
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup
          label="Add comment"
          withFieldset>
          <FormInput {...register('comment')}/>
        </FormGroup>
        <ButtonPrimary type="submit">Add</ButtonPrimary>
      </form>
      <Table>
        <colgroup>
          <col width="20%" />
          <col width="30%" />
          <col />
        </colgroup>
        <thead>
          <TableRow>
            <TableHeaderCell>Date</TableHeaderCell>
            <TableHeaderCell>Comment</TableHeaderCell>
            <TableHeaderCell>User</TableHeaderCell>
          </TableRow>
        </thead>
        <tbody>
          {activityLog
            .filter(activity => !!activity.comment)
            .map(({ id, date, user, comment }) => {
              return (
                <TableRow key={id}>
                  <TableCell>
                    {Utils.formattedTimeStamp(date)}
                  </TableCell>
                  <TableCell>
                    {comment}
                  </TableCell>
                  <TableCell>
                    {user}
                  </TableCell>
                </TableRow>
              );
            })}
        </tbody>
      </Table>
    </NavPillPanel>,
    <NavPillPanel id="activity-log" aria-labelledby="activity-log-tab">
      <Type as="h2" variant={Type.heading3}>
        Activity Log
      </Type>
      <Table>
        <colgroup>
          <col width="20%" />
          <col width="30%" />
          <col />
        </colgroup>
        <thead>
          <TableRow>
            <TableHeaderCell>Date</TableHeaderCell>
            <TableHeaderCell>Action</TableHeaderCell>
            <TableHeaderCell>User</TableHeaderCell>
          </TableRow>
        </thead>
        <tbody>
          {activityLog
            .filter(activity => activity.action !== CERTIFICATION_ACTIONS.COMMENT)
            .map(({ id, date, user, action }) => {
              const actionDescription = CERTIFICATION_ACTIONS_READABLE[action] || action;
              return (
                <TableRow key={id}>
                  <TableCell>
                    {Utils.formattedTimeStamp(date)}
                  </TableCell>
                  <TableCell>
                    <strong>{actionDescription}</strong> the certification
                  </TableCell>
                  <TableCell>
                    {user}
                  </TableCell>
                </TableRow>
              );
            })}
        </tbody>
      </Table>
    </NavPillPanel>,
    ...isAdmin ? [
      <NavPillPanel id="actions" aria-labelledby="actions-tab">
        <Type as="h2" variant={Type.heading3}>
          Actions
        </Type>
        {certificationStatus === CERTIFICATION_STATUSES.SUBMITTED && (
          <div style={{ marginTop: spacer16 }}>
            <ButtonPrimary
              style={{ marginRight: spacer32 }}
              onClick={() => handleCertificationStatusChange(CERTIFICATION_STATUSES.PASSED)}
            >
              Pass certification
            </ButtonPrimary>
            <ButtonPrimary
              colorSet="negative"
              onClick={() => handleCertificationStatusChange(CERTIFICATION_STATUSES.FAILED)}
            >
              Fail certification
            </ButtonPrimary>
          </div>)}
        {[
          CERTIFICATION_STATUSES.FAILED,
          CERTIFICATION_STATUSES.PASSED,
        ].includes(certificationStatus) && (
          <div style={{ marginTop: spacer16 }}>
            <ButtonPrimary
              colorSet="base"
              onClick={() => handleCertificationStatusChange(CERTIFICATION_STATUSES.SUBMITTED)}
            >
              Move back to Submitted
            </ButtonPrimary>
          </div>)}
      </NavPillPanel>,
    ] : [],
  ];

  return (
    <div className="certReport">
      {!Utils.printerMode() && <a href="?print" target="_blank" className="printLink">Printer friendly version</a>}
      <h1>Spotify Certification Report</h1>
      {certificationStatus === CERTIFICATION_STATUSES.PASSED && (
        <div className="alert-box">
          <p>Congratulations, the device has passed certification based on the testing you have performed and submitted.</p>
          <strong>What's Next?</strong>
          <p>If you don't have an approved Distribution Agreement v2 (specified in the top right corner in the agreement), please complete the <a className="alert-href" href="https://docs.google.com/forms/d/e/1FAIpQLSclU4TY10jgwZcvqBT1U3NGieGihH2_FnwpKvOxl4_pe7UF7g/viewform" target="_blank">Distribution Agreement application form</a>. Partners are not allowed to launch before a distribution agreement has been approved by Spotify.</p>
          <strong>explore.spotify.com</strong>
          <p>Now when the device has passed the certification, Spotify would like to include the product on <a className="alert-href" href="https://explore.spotify.com/moments/entertain" target="_blank">explore.spotify.com</a> once it has been launched. Spotify will create a listing of your product, but if you would like to provide us with product copy, imagery and other details for the site then please fill out this <a className="alert-href" href="https://goo.gl/forms/2EowfKxOxe3rhAef1" target="_blank">form</a>.</p>
        </div>
      )}
      <h2
        className={classNames({
          certStatusNotReviewed:
            certificationStatus === CERTIFICATION_STATUSES.SUBMITTED,
          certStatusFailed:
            certificationStatus === CERTIFICATION_STATUSES.FAILED,
          certStatusPassed:
            certificationStatus === CERTIFICATION_STATUSES.PASSED,
        })}
      >
        {certificationStatus}
      </h2>
      <dl className="panel">
        {[
          {
            label: 'Certification ID',
            value: certificationId,
          },
          { label: 'Brand', value: brand },
          { label: 'Model', value: model },
          { label: 'Product ID', value: productId },
          { label: 'Device type', value: type },
          { label: 'Client ID', value: clientId },
          { label: 'Platform', value: platform },
          { label: 'eSDK version', value: version },
          {
            label: 'Tested on',
            value: `${dateRange?.startDate ? Utils.formattedTimeStamp(
              dateRange?.startDate,
            ) : ''} - ${dateRange?.endDate ? Utils.formattedTimeStamp(dateRange?.endDate) : ''}`,
          },
          ... features.length > 0 ? [{
            label: 'Features',
            value: (
              <List>
                {
                  features.map(feature => {
                    return CERTIFICATION_FEATURES[feature] ? (<Tag component="li">{CERTIFICATION_FEATURES[feature]}</Tag>) : null;
                  })
                }
              </List>
            ),
          }] : [],
        ].map(({ label, value }) => (
          <Fragment key={label}>
            <dt>{label}</dt>
            <dd>
              {Array.isArray(value) ? (
                <span
                  className={classNames(value.length !== 1 && 'testResultFailed')}
                >
                  {value.join(', ')}
                </span>
              ) : (
                <span>{value}</span>
              )}
            </dd>
          </Fragment>
        ))}
      </dl>
      <NavPill
        list={
          <NavPillList>
            <NavPillListItem
              id="test-results-tab"
              aria-controls="test-results"
              active={activeTab === 0}
              label="Test Results"
              onClick={() => setActiveTab(0)}
            />
            <NavPillListItem
              id="comments-tab"
              aria-controls="comments"
              active={activeTab === 1}
              label="Comments"
              onClick={() => setActiveTab(1)}
            />
            <NavPillListItem
              id="activity-log-tab"
              aria-controls="activity-log"
              active={activeTab === 2}
              label="Activity Log"
              onClick={() => setActiveTab(2)}
            />
            {isAdmin ?
              <NavPillListItem
                id="actions-tab"
                aria-controls="actions"
                active={activeTab === 3}
                label="Actions"
                onClick={() => setActiveTab(3)}
              /> : null
            }
          </NavPillList>
        }
      >
        {navPillContent[activeTab]}
      </NavPill>
    </div>
  );
};

export default CertificationReport;
