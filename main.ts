import { App, MarkdownPostProcessor, MarkdownPostProcessorContext, MarkdownPreviewRenderer, MarkdownRenderer, Modal, Notice, Plugin, PluginSettingTab, Setting  } from 'obsidian';
import { smartypants } from 'smartypants';

// interface MyPluginSettings {
// 	mode: number;
// }

// const DEFAULT_SETTINGS: MyPluginSettings = {
// 	mode: 2
// }

export default class SmartypantsPlugin extends Plugin {
	// settings: MyPluginSettings;

    static postprocessor: MarkdownPostProcessor = (el: HTMLElement, ctx: MarkdownPostProcessorContext) => {
        // console.log("postprocessor is called")

        // console.log(el)

        const source = el.innerHTML
        let educated = smartypants(source, 2) // @TODO use MyPluginSettings here
        // console.log("educated version:")
        // console.log(educated)

        // el.appendChild(educated)
        el.innerHTML = educated
        // blockToReplace.innerHTML = educated
    }

    async onload() {
        console.log('Loading Smartypants plugin');

		// await this.loadSettings();

		// this.addSettingTab(new SampleSettingTab(this.app, this));

        MarkdownPreviewRenderer.registerPostProcessor(SmartypantsPlugin.postprocessor)
    }

    async onunload() {
        console.log('Unloading smartypants plugin');
        MarkdownPreviewRenderer.unregisterPostProcessor(SmartypantsPlugin.postprocessor)
    }

	// async loadSettings() {
	// 	this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	// }

	// async saveSettings() {
	// 	await this.saveData(this.settings);
	// }
}


// class SampleSettingTab extends PluginSettingTab {
// 	plugin: MyPlugin;

// 	constructor(app: App, plugin: MyPlugin) {
// 		super(app, plugin);
// 		this.plugin = plugin;
// 	}

// 	display(): void {
// 		let {containerEl} = this;

// 		containerEl.empty();

// 		containerEl.createEl('h2', {text: 'Settings for my awesome plugin.'});

// 		new Setting(containerEl)
// 			.setName('Setting #1')
// 			.setDesc('It\'s a secret')
// 			.addText(text => text
// 				.setPlaceholder('Enter your secret')
// 				.setValue('')
// 				.onChange(async (value) => {
// 					console.log('Secret: ' + value);
// 					this.plugin.settings.mode = value;
// 					await this.plugin.saveSettings();
// 				}));
// 	}
// }
