import { Button, Popover } from 'antd'

export default function SessionReviewerList({ reviewers }: any) {
  if (!reviewers || !reviewers.length) return <></>

  const MultiReviewerLabel = (
    <div style={{ cursor: 'pointer' }}>
      {reviewers[0]?.name}
      {reviewers?.length > 1 ? (
        <Button style={{ padding: '2px', height: '22px', lineHeight: '20px' }} type="link">
          {`+ ${reviewers.length - 1} more`} {reviewers.length > 1}
        </Button>
      ) : null}
    </div>
  )

  const PopOverConent = (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {reviewers.map((reviewer: any) => (
        <span>{reviewer.name}</span>
      ))}
    </div>
  )

  return reviewers?.length > 1 ? (
    <Popover trigger="click" placement="leftTop" content={PopOverConent} arrowPointAtCenter={true}>
      {MultiReviewerLabel}
    </Popover>
  ) : (
    reviewers[0]?.name
  )
}
