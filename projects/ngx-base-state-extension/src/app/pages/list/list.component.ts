import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MetadataListFiltersState, SelectedOperationItemViewTabIndexState } from './states';
import { FilteredOperationsService } from './services';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        MetadataListFiltersState,
        FilteredOperationsService
    ]
})
export class ListComponent {
    public readonly selectedTabIndex$ = this.selectedOperationItemViewTabIndexState.data$;
    
    constructor(
        private readonly selectedOperationItemViewTabIndexState: SelectedOperationItemViewTabIndexState,
    ) {}

    public onOperationItemViewTabClick(operationItemViewTabIndex: number): void {
        this.selectedOperationItemViewTabIndexState.set(operationItemViewTabIndex);
    }
}
