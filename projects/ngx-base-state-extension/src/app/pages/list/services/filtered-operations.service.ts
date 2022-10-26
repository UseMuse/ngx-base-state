import { Injectable } from '@angular/core';
import { map, shareReplay, combineLatest } from 'rxjs';
import { MetadataService } from '@extension-services';
import { MetadataOperation as Operation } from '@extension-interfaces';
import { Filters } from '../interfaces';
import { MetadataListFiltersState } from '../states';

@Injectable()
export class FilteredOperationsService {
    public readonly data$ = combineLatest([
        this.operationsService.dataAsArray$,
        this.filtersState.data$
    ])
        .pipe(
            map(([operations, filters]) => this.filter(operations, filters!)),
            shareReplay(1)
        );

    constructor(
        private readonly operationsService: MetadataService,
        private readonly filtersState: MetadataListFiltersState
    ) {}

    private filter(operations: Operation[], filters: Filters): Operation[] {
        const searchString = filters.searchString.toLowerCase();

        return operations
            .filter((operation) => 
                this.filterItemBySearchString(operation, searchString) &&
                this.filterItemByDataType(operation, filters.dataType)
            )
            .sort(filters.sortBy.compareFn);
    }

    private filterItemByDataType(operation: Operation, dataType: string | null): boolean {
        if (dataType) {
            return (operation.dataType === dataType);
        }

        return true;
    }

    private filterItemBySearchString(operation: Operation, searchString: string): boolean {
        return (
            this.isItemClassNameMatchWithSearchString(operation, searchString) ||
            this.isItemClassContextMatchWithSearchString(operation, searchString)
        );
    }

    private isItemClassNameMatchWithSearchString(operation: Operation, searchString: string): boolean {
        return operation.className
            .toLowerCase()
            .includes(searchString);
    }

    private isItemClassContextMatchWithSearchString(operation: Operation, searchString: string): boolean {
        if (operation.classContext) {
            return operation.classContext
                .toLowerCase()
                .includes(searchString);
        }
        
        return false;
    }
}
