import { LightningElement, wire } from 'lwc';
import getProjects from '@salesforce/apex/projectBudgetTrackerController.getProjects';

export default class projectBudgetTracker extends LightningElement {
    projects = [];
    selectedProject = null;

    @wire(getProjects)
    wiredProjects({ error, data }) {
        if (data) {
            this.projects = data.map(project => ({
                id: project.Id,
                number: project.Name,
                name: project.Project_Name__c,
                funding: project.Funding_Allocated__c,
                expenditure: project.Total_Expenditure__c,
                remainingBudget: project.Remaining_Budget__c
            }));
        } else if (error) {
            console.error('Error fetching projects:', error);
        }
    }

    handleProjectChange(event) {
        const projectId = event.target.value;
        this.selectedProject = this.projects.find(project => project.id === projectId);
    }

    get projectOptions() {
        return this.projects.map(project => ({
            label: project.name,
            value: project.id
        }));
    }
}
