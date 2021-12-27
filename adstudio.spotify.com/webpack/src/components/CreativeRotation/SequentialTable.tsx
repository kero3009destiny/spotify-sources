import React, { Component, FunctionComponent } from 'react';
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
  DroppableProvided,
  DropResult,
} from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import i18n from 'i18next';
import isEqual from 'lodash/isEqual';
import styled from 'styled-components';

import {
  black,
  spacer4,
  spacer64,
  white,
} from '@spotify-internal/encore-foundation';
import {
  IconMenu,
  Table,
  TableCell,
  TableContainer,
  TableHeaderCell,
  TableRow,
  TableThumbnail,
} from '@spotify-internal/encore-web';

import { CreativesCatalogueState } from 'ducks/creatives/reducer';
import { getCreativesForRotationTables } from 'ducks/creatives/selectors';

import { TableBody } from '../common/Table/TableBody';
import { NoWrapTableCell } from '../common/Table/TableCells';
import { FirstColumnTableHeaderCell } from './helpers';
import { NameCell } from './NameCell';

import { CreativesCatalogueEntity } from '../../types/common/state/api/creatives';
import { CreativesCatalogueEntityWithRotationParameters } from './types';

const StyledNameCellContainer = styled.div`
  display: flex;
`;

const StyledTableRow = styled(TableRow)<{ isDragging: boolean }>`
  user-select: none;
  ${props =>
    props.isDragging
      ? `
    background: ${white};
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
    border-radius: ${spacer4};

    /* maintain cell width while dragging */
    display: table;
  `
      : ''};
`;

const DragDropArrowDisplay = styled.div`
  display: grid;
  width: 40px;
  grid-template-columns: 1fr;
`;

const StyledIconMenu = styled(IconMenu)`
  width: 24px;
  height: 24px;
  color: ${black};
`;

// FIXME: the typecasting was required based on the versions of typescript and styled components (https://github.com/microsoft/TypeScript/issues/37597#). When we upgrade to styled components 5, "as TSFixMe" can be removed
const OrderCell = styled(NoWrapTableCell as any)`
  min-width: ${spacer64};
`;

interface DraggableTableRowProps {
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
}

export const DraggableTableRow: FunctionComponent<DraggableTableRowProps> = ({
  snapshot,
  provided,
  children,
}) => {
  return (
    <StyledTableRow
      ref={provided.innerRef}
      isDragging={snapshot.isDragging}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      {children}
    </StyledTableRow>
  );
};

export interface StateProps {
  creativesCatalogue: CreativesCatalogueState;
}

export interface OwnProps {
  onChangeOrder: (
    creatives: CreativesCatalogueEntityWithRotationParameters[],
  ) => void;
}

export type SequentialTableProps = StateProps & OwnProps;

export interface SequentialTableState {
  orderedCreatives: CreativesCatalogueEntityWithRotationParameters[];
}

export class SequentialTable extends Component<
  SequentialTableProps,
  SequentialTableState
> {
  state: SequentialTableState = {
    orderedCreatives: [],
  };

  tableRef?: HTMLElement = undefined;

  componentDidMount() {
    this.applyCreativeOrder(this.props.creativesCatalogue.items, true);
  }

  onDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (
      !result.destination ||
      result.destination.index === result.source.index
    ) {
      return;
    }

    // no movement
    if (result.destination.index === result.source.index) {
      return;
    }

    this.reorderCreatives(result.source.index, result.destination.index);
  };

  reorderCreatives = (sourceIndex: number, destinationIndex: number) => {
    this.state.orderedCreatives.splice(
      destinationIndex - 1,
      0,
      this.state.orderedCreatives.splice(sourceIndex - 1, 1)[0],
    );
    this.applyCreativeOrder(this.state.orderedCreatives);
  };

  componentWillReceiveProps(nextProps: Readonly<SequentialTableProps>) {
    if (
      !isEqual(
        this.props.creativesCatalogue.items,
        nextProps.creativesCatalogue.items,
      )
    ) {
      this.applyCreativeOrder(this.props.creativesCatalogue.items, true);
    }
  }

  applyCreativeOrder = (
    creatives: CreativesCatalogueEntity[],
    initialize: boolean = false,
  ) => {
    const creativesAlreadyHaveAnOrder =
      creatives[0] &&
      creatives[0].flightLink &&
      !!creatives[0].flightLink.creativeRotationParameters.order;
    let orderedCreatives: CreativesCatalogueEntityWithRotationParameters[];
    if (initialize && creativesAlreadyHaveAnOrder) {
      // Get the existing order
      orderedCreatives = creatives.map(
        (creativeCatalogueEntity: CreativesCatalogueEntity) => {
          return {
            ...creativeCatalogueEntity,
            order:
              creativeCatalogueEntity.flightLink?.creativeRotationParameters
                .order,
          };
        },
      );
      orderedCreatives.sort((a, b) => {
        if (a.order! < b.order!) return -1;
        if (a.order! < b.order!) return 1;
        return 0;
      });
    } else {
      // Create a new ordering
      orderedCreatives = creatives.map(
        (creativeCatalogueEntity: CreativesCatalogueEntity, idx: number) => {
          return {
            ...creativeCatalogueEntity,
            order: idx + 1,
          };
        },
      );
    }
    this.setState({ orderedCreatives });
    this.props.onChangeOrder(orderedCreatives);
  };

  render() {
    const { creativesCatalogue } = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <TableContainer>
          <Table data-test="ad-rotation-sequential-creatives-table">
            <thead>
              <TableRow>
                <FirstColumnTableHeaderCell>
                  {i18n.t('I18N_ORDER', 'Order')}
                </FirstColumnTableHeaderCell>
                <TableHeaderCell>
                  {i18n.t('I18N_AD_NAME', 'Ad name')}
                </TableHeaderCell>
                <TableHeaderCell />
              </TableRow>
            </thead>
            <Droppable droppableId="table">
              {(droppableProvided: DroppableProvided) => (
                <TableBody
                  {...droppableProvided.droppableProps}
                  droppableRef={(instance: HTMLTableSectionElement) => {
                    this.tableRef = instance;
                    droppableProvided.innerRef(instance);
                  }}
                  isLoading={creativesCatalogue.loading}
                  empty={creativesCatalogue.items.length === 0}
                >
                  {this.state.orderedCreatives.map(
                    (
                      creativeRow: CreativesCatalogueEntityWithRotationParameters,
                    ) => {
                      return (
                        <Draggable
                          draggableId={creativeRow.creativeId}
                          index={creativeRow.order!}
                          key={creativeRow.creativeId}
                        >
                          {(
                            provided: DraggableProvided,
                            snapshot: DraggableStateSnapshot,
                          ) => (
                            <DraggableTableRow
                              provided={provided}
                              snapshot={snapshot}
                              key={`creative-table-row-${creativeRow.creativeId}`}
                            >
                              <OrderCell>{creativeRow.order}</OrderCell>
                              <TableCell>
                                <StyledNameCellContainer>
                                  <TableThumbnail
                                    small
                                    imgAlt={creativeRow.name}
                                    img={creativeRow.imageUrl}
                                  />
                                  <NameCell
                                    keyId={creativeRow.creativeId}
                                    name={creativeRow.name}
                                  />
                                </StyledNameCellContainer>
                              </TableCell>
                              <NoWrapTableCell>
                                <DragDropArrowDisplay>
                                  <StyledIconMenu />
                                </DragDropArrowDisplay>
                              </NoWrapTableCell>
                            </DraggableTableRow>
                          )}
                        </Draggable>
                      );
                    },
                  )}
                </TableBody>
              )}
            </Droppable>
          </Table>
        </TableContainer>
      </DragDropContext>
    );
  }
}

export const mapStateToProps = (state: TSFixMe): StateProps => {
  return {
    creativesCatalogue: getCreativesForRotationTables(state),
  };
};

export const ConnectedSequentialTable = connect<StateProps, {}, OwnProps>(
  mapStateToProps,
)(SequentialTable);

export default ConnectedSequentialTable;
