import RaptorIcon, { ICONS } from '../../Raptor/RaptorIcon/RaptorIcon'
import RaptorTable, { raptorTableState } from '../../Raptor/RaptorTable/RaptorTable'
import {
  fetchRemoteDeploymentRequestReviewersById,
  fetchRemoteDeploymentRequests,
} from '../../api/services/remoteDeploymentRequests-service'
import { toolbarComponentTypes } from '../../Raptor/RaptorTable/RaptorTableToolbarComponents'
import React from 'react'
import { Button, Collapse, Popover, Typography } from 'antd/lib'
import DeploymentRequestModal from '../DeploymentRequestModal/DeploymentRequestModal'
import PauseOrCloseModal from './PauseOrCloseModal'
import ResumeModal from './ResumeModal'
import EditModal from './EditModal'
import {
  PAUSE_REQUEST,
  CLOSE_REQUEST,
  RESUME_REQUEST,
  EDIT_REQUEST,
} from './RequestPage.interfaces'
import { Nullable } from '../../Raptor/interfaces'
import { getPostFilters } from '../../Raptor/RaptorTable/Raptor.utils'
import { getOptions } from '../RequestsPage/RequestPageFilter'
import ClosableContentLayout from './ClosableContent/ClosableContentLayout'
import {
  REQUEST_CLOSABLE_PANEL_HEIGHT,
  PROCESSING,
  DEPLOYED,
  PENDING,
  PAUSED,
  EXPIRING,
  SORT_ORDER_MAP,
  DATE_TIME_FORMAT,
} from '../../Constants'
import LocalTimeFromUTC from '../../components/UI/LocalTimeFromUTC'
import SpecialInstructionsModal from './SpecialInstructionsModal'
import usePagination from '../../Raptor/Hooks/RaptorTable/usePagination'
import useSort from '../../Raptor/Hooks/RaptorTable/useSort'

const { Panel } = Collapse
const { Text } = Typography

const localState = {
  filters: {},
  toolbarOptions: [],
}

const SORT_FIELD_MAP: any = {
  requestId: 'remoteDeploymentRequestId',
  requestStartDt: 'startDt',
  requestEndDt: 'endDt',
  requestDate: 'requestDt',
  'requestor.displayName': 'firstName',
}

export default function RequestsPage() {
  const [remoteDeploymentRequests, setRemoteDeploymentRequests] = React.useState<any>({
    records: [],
    total: 0,
  })
  const [loadTable, setLoadTable] = React.useState(true)
  const [state, setState] = React.useState<any>(
    JSON.parse(JSON.stringify({ ...raptorTableState, ...localState }))
  )
  const [requestModalVisible, setRequestModalVisible] = React.useState(false)
  const [specialInstructionsModal, setSpecialInstructionsModal] = React.useState(false)
  const [environments, setEnvironments] = React.useState<string[]>([])
  const [requestModalId, setRequestModalId] = React.useState<string>('')
  const [selectedRequestRow, setSelectedRequestRow] = React.useState<any>([])
  const [selectedDeploymentId, setSelectedDeploymentId] = React.useState<any>([])
  const { pagination, setPagination } = usePagination({ prefPageSize: 'requests.pageSize' })
  const { current: page, pageSize } = pagination
  const { sortOrder, sortField, onSort, setDefaultSort } = useSort({
    defaultSortOrder: 'descend',
    defaultSortField: 'requestDate',
    sortOrderPref: 'requests.sortOrder',
    sortFieldPref: 'requests.sortField',
  })

  const toolbarLinks = React.useMemo(
    () => [
      {
        type: toolbarComponentTypes.LINK,
        name: 'Pause',
        id: 'pause',
        disabled: true,
        onClick() {
          modalHandler('pause')
        },
      },
      {
        type: toolbarComponentTypes.LINK,
        name: 'Resume',
        id: 'resume',
        disabled: true,
        onClick() {
          modalHandler('resume')
        },
      },
      {
        type: toolbarComponentTypes.LINK,
        name: 'Close',
        id: 'close',
        disabled: true,
        onClick() {
          modalHandler('close')
        },
      },
      {
        type: toolbarComponentTypes.LINK,
        name: 'Edit',
        id: 'edit',
        disabled: true,
        onClick() {
          modalHandler('edit')
        },
      },
    ],
    []
  )
  const toolBarOptions = React.useCallback(() => {
    if (requestModalId === 'edit') {
      const targetRequest = remoteDeploymentRequests?.records?.find(
        (remoteDeploymentRequest: any) => {
          return remoteDeploymentRequest.requestId === selectedRequestRow[0].requestId
        }
      )
      enablingDisablingActions(targetRequest ? [targetRequest] : selectedRequestRow)
    } else {
      setState((prevState: any) => {
        return {
          ...prevState,
          toolbarOptions: toolbarLinks.filter((link) => link.id !== 'resume'),
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toolbarLinks, requestModalId, remoteDeploymentRequests])

  const filtersApplied = React.useCallback((appliedFilters) => {
    setState((prevState: any) => {
      return {
        ...prevState,
        filters: appliedFilters,
      }
    })
  }, [])

  const filtersStr = React.useRef<Nullable<string>>(null)
  filtersStr.current = JSON.stringify(state.filters)

  const renderSelectedRow = (selectedRequestRow: any, remoteDeploymentRequests: any) => {
    const selectedBundleId = remoteDeploymentRequests.records.find(
      (exp: any) =>
        exp.remoteDeploymentRequestId === selectedRequestRow?.[0].remoteDeploymentRequestId
    )
    if (selectedBundleId !== undefined) {
      setSelectedRequestRow([selectedBundleId])
      setRequestModalId('edit')
    } else {
      setSelectedRequestRow(selectedRequestRow)
      setRequestModalId('')
    }
  }

  React.useEffect(() => {
    const appliedFilters = getPostFilters(filtersStr.current)
    Object.entries(appliedFilters).forEach(([key, value]: any) => {
      if (key === 'cases') {
        appliedFilters['cases'] = value.map((val: any) => val.value)
      }
    })
    async function getRemoteDeploymentRequests() {
      const deploymentRequestSearchInfo = {
        filters: appliedFilters,
        _sort: SORT_FIELD_MAP[sortField] ?? sortField,
        _order: SORT_ORDER_MAP[sortOrder],
        _limit: pageSize,
        _page: page,
        q_op: 'CONTAINS',
      }
      const remoteDeploymentRequests = (await fetchRemoteDeploymentRequests(
        deploymentRequestSearchInfo
      )) || {
        total: 0,
        records: [],
      }
      setRemoteDeploymentRequests(remoteDeploymentRequests)
      setPagination((prevState) => {
        return {
          ...prevState,
          total: remoteDeploymentRequests.total,
        }
      })
      if (selectedRequestRow.length > 0 && remoteDeploymentRequests.records) {
        renderSelectedRow(selectedRequestRow, remoteDeploymentRequests)
      }
      setLoadTable(false)
      toolBarOptions()
    }
    if (loadTable) {
      getRemoteDeploymentRequests()
      toolBarOptions()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadTable, toolBarOptions])

  React.useEffect(() => {
    const defaultValues = getPostFilters(filtersStr.current || {})
    const filterOptions = getOptions({
      defaultValues,
      onChange: function (updatedFilters: any) {
        filtersApplied(updatedFilters)
        setLoadTable(true)
      },
    })
    filtersApplied(filterOptions)
  }, [filtersStr, filtersApplied])

  React.useEffect(() => {
    setLoadTable(true)
  }, [sortField, sortOrder, page, pageSize])

  const enablingDisablingActions = React.useCallback(
    (selectedRow: any) => {
      let menuOptions: any[]
      if (selectedRow?.[0]?.status === PAUSED) {
        menuOptions = toolbarLinks.filter((link) => link.id !== 'pause').flat(1)
      } else {
        menuOptions = toolbarLinks.filter((link) => link.id !== 'resume').flat(1)
      }
      setState({
        ...state,
        toolbarOptions: menuOptions.map((option) => {
          function isActionLinkDisabled(option: any) {
            let status
            if (
              (option.id === 'pause' && selectedRow?.[0]?.status === DEPLOYED) ||
              (option.id === 'resume' && selectedRow?.[0]?.status === PAUSED) ||
              (option.id === 'close' &&
                (selectedRow?.[0]?.status === DEPLOYED || selectedRow?.[0]?.status === PAUSED)) ||
              (option.id === 'edit' &&
                (selectedRow?.[0]?.status === DEPLOYED || selectedRow?.[0]?.status === EXPIRING))
            ) {
              status = false
            } else {
              status = true
            }
            return status
          }
          return { ...option, disabled: isActionLinkDisabled(option) }
        }),
      })
    },
    [state, toolbarLinks]
  )

  React.useEffect(() => {
    if (selectedRequestRow?.length) {
      const targetRequest = remoteDeploymentRequests?.records?.find(
        (remoteDeploymentRequest: any) => {
          return remoteDeploymentRequest.requestId === selectedRequestRow[0].requestId
        }
      )
      enablingDisablingActions(targetRequest ? [targetRequest] : [])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remoteDeploymentRequests])

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      setSelectedRequestRow(selectedRows)
      enablingDisablingActions(selectedRows)
    },
    selectedRows: selectedRequestRow,
  }

  function modalHandler(key: string) {
    setRequestModalVisible(true)
    setRequestModalId(key)
  }

  const onCloseModalHandler = () => {
    setRequestModalVisible(false)
    enablingDisablingActions(selectedRequestRow)
  }

  const afterActionHandler = () => {
    setRequestModalVisible(false)
    if (requestModalId === 'edit') {
      setRequestModalId('edit')
    } else {
      setRequestModalId('')
      setSelectedRequestRow([])
    }
    setLoadTable(true)
  }

  const currentModal: any = {
    pause: (
      <PauseOrCloseModal
        action={PAUSE_REQUEST}
        remoteDeploymentRequest={selectedRequestRow?.[0]}
        afterAction={afterActionHandler}
        onCloseModal={onCloseModalHandler}
        visible={requestModalVisible}
      />
    ),
    close: (
      <PauseOrCloseModal
        action={CLOSE_REQUEST}
        remoteDeploymentRequest={selectedRequestRow?.[0]}
        afterAction={afterActionHandler}
        onCloseModal={onCloseModalHandler}
        visible={requestModalVisible}
      />
    ),
    resume: (
      <ResumeModal
        action={RESUME_REQUEST}
        remoteDeploymentRequest={selectedRequestRow?.[0]}
        afterAction={afterActionHandler}
        onCloseModal={onCloseModalHandler}
        visible={requestModalVisible}
      />
    ),
    edit: (
      <EditModal
        action={EDIT_REQUEST}
        remoteDeploymentRequest={selectedRequestRow?.[0]}
        afterAction={afterActionHandler}
        onCloseModal={onCloseModalHandler}
        visible={requestModalVisible}
      />
    ),
  }

  const RequestModalComponent = currentModal[requestModalId]

  const onSpecialInstructionsModalHandler = () => {
    setSpecialInstructionsModal(false)
    enablingDisablingActions(selectedRequestRow)
  }

  const columns = [
    {
      title: 'Request ID',
      dataIndex: 'requestId',
      key: 'requestId',
      sorter: true,
      sortOrder: sortField === 'requestId' && sortOrder ? sortOrder : null,
    },
    {
      title: 'Case',
      dataIndex: 'caseName',
      key: 'caseName',
      sorter: true,
      sortOrder: sortField === 'caseName' && sortOrder ? sortOrder : null,
    },
    {
      title: 'Start Time',
      dataIndex: 'requestStartDt',
      key: 'requestStartDate',
      sorter: true,
      sortOrder: sortField === 'requestStartDt' && sortOrder ? sortOrder : null,
      render: (utcDate: string) =>
        utcDate && <LocalTimeFromUTC utcTime={utcDate} dateFormat={DATE_TIME_FORMAT} />,
    },
    {
      title: 'End Time',
      dataIndex: 'requestEndDt',
      key: 'requestEndDate',
      sorter: true,
      sortOrder: sortField === 'requestEndDt' && sortOrder ? sortOrder : null,
      render: (utcDate: string) =>
        utcDate && <LocalTimeFromUTC utcTime={utcDate} dateFormat={DATE_TIME_FORMAT} />,
    },
    {
      title: 'Requestor',
      dataIndex: ['requestor', 'displayName'],
      key: 'requestor',
      sorter: true,
      sortOrder: sortField === 'requestor.displayName' && sortOrder ? sortOrder : null,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: true,
      sortOrder: sortField === 'status' && sortOrder ? sortOrder : null,
      render: (status: string) =>
        status && status === EXPIRING ? <Text type="danger">{status}</Text> : status,
    },
    {
      title: 'Request Time',
      dataIndex: 'requestDate',
      key: 'requestDate',
      sorter: true,
      sortOrder: sortField === 'requestDate' && sortOrder ? sortOrder : null,
      render: (utcDate: string) =>
        utcDate && <LocalTimeFromUTC utcTime={utcDate} dateFormat={DATE_TIME_FORMAT} />,
    },
    {
      dataIndex: 'splInstruction',
      key: 'splInstruction',
      width: '50px',
      render: (specialInstruction: string, remoteDeploymentRequest: any) => {
        if (!specialInstruction || !Array.isArray(specialInstruction)) return
        const markAsCompleteDisabled = remoteDeploymentRequest.status === PROCESSING
        const markAsCompleteShown =
          remoteDeploymentRequest.status === PROCESSING ||
          remoteDeploymentRequest.status === PENDING

        const HoverContent = (
          <div style={{ maxWidth: '220px' }}>
            <div
              style={{
                fontSize: '10px',
                color: '#595959',
                fontWeight: 600,
                marginBottom: '12px',
                width: '220px',
              }}
            >
              SPECIAL INSTRUCTIONS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {specialInstruction.map(({ date, instructions }) => {
                return (
                  <>
                    <div style={{ fontSize: '10px', color: '#A0A0A0', fontWeight: 400 }}>
                      {<LocalTimeFromUTC utcTime={date as string} />}
                    </div>
                    <div
                      style={{
                        fontSize: '12px',
                        color: '#2F3943',
                        fontWeight: 400,
                        paddingBottom: '20px',
                      }}
                    >
                      {instructions}
                    </div>
                  </>
                )
              })}
              {markAsCompleteShown && (
                <Button
                  disabled={markAsCompleteDisabled}
                  type="link"
                  style={{ width: '150px', marginLeft: 'auto', paddingRight: 0 }}
                  onClick={async () => {
                    const reviewersResponse = await fetchRemoteDeploymentRequestReviewersById(
                      remoteDeploymentRequest.remoteDeploymentRequestId
                    )
                    setSelectedDeploymentId(remoteDeploymentRequest.remoteDeploymentRequestId)
                    setEnvironments(reviewersResponse.total)
                    setSpecialInstructionsModal(true)
                  }}
                >
                  Mark as Complete
                </Button>
              )}
            </div>
          </div>
        )
        const HoverComponent = (
          <Popover
            content={HoverContent}
            placement="bottom"
            trigger="click"
            id="search-badge-tooltip"
          >
            <RaptorIcon
              height="15px"
              width="15px"
              type={ICONS.DOC}
              style={{ cursor: 'pointer' }}
              className="special-instructions-icon"
              title={'Special Instructions'}
            />
          </Popover>
        )
        return HoverComponent
      },
    },
  ]
  setDefaultSort(columns)

  const [collapsePanelOpen, setCollapsePanelOpen] = React.useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 83px)' }}>
      <div style={{ flexGrow: 1, flexShrink: 2 }}>
        <div id="requests-page">
          <DeploymentRequestModal />
          <div id="requests-table">
            <RaptorTable
              rowSelection={{
                type: 'radio',
                ...rowSelection,
              }}
              scroll={{
                y: `calc(100vh - ${
                  collapsePanelOpen ? REQUEST_CLOSABLE_PANEL_HEIGHT : '0px'
                } - 300px)`,
                x: '1000px',
              }}
              rowKey="requestId"
              columns={columns}
              onChange={onSort}
              footer={{ pagination }}
              dataSource={remoteDeploymentRequests.records}
              filters={state.filters}
              toolbarOptions={state.toolbarOptions}
            />
            {requestModalVisible && RequestModalComponent}
            {specialInstructionsModal && (
              <SpecialInstructionsModal
                visible={specialInstructionsModal}
                setVisible={setSpecialInstructionsModal}
                environments={environments}
                remoteDeploymentRequestId={selectedDeploymentId}
                loadTable={setLoadTable}
                onCloseModal={onSpecialInstructionsModalHandler}
              />
            )}
          </div>
        </div>
      </div>
      <div style={{ background: '#aaaaaa', height: '5px' }}>Slider</div>
      <div>
        <Collapse
          style={{ border: 'none' }}
          accordion
          onChange={(panelName) => {
            setCollapsePanelOpen(!!panelName)
          }}
          expandIcon={({ isActive }) => (
            <RaptorIcon
              type={ICONS.CHEVRON_UP}
              width="20px"
              height="20px"
              className="splitter-control"
              style={{
                transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)',
                padding: 0,
                top: '13px',
                left: '49.5%',
              }}
            />
          )}
        >
          <Panel
            key="request-panel"
            header={`Total Requests: ${remoteDeploymentRequests.total}`}
            style={{ background: 'FAFAFA', padding: 'none' }}
          >
            <ClosableContentLayout
              style={{ height: REQUEST_CLOSABLE_PANEL_HEIGHT }}
              remoteDeploymentRequest={selectedRequestRow?.[0]}
              reloadRequests={() => {
                setLoadTable(true)
              }}
            />
          </Panel>
        </Collapse>
      </div>
    </div>
  )
}
