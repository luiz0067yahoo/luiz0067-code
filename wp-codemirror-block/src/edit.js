/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, PanelRow } from '@wordpress/components';
import { useEffect, useRef } from '@wordpress/element';

/**
 * CodeMirror 6 dependencies
 */
import { basicSetup } from 'codemirror';
import { EditorView, keymap } from '@codemirror/view';
import { EditorState, Compartment } from '@codemirror/state';
import { defaultKeymap, indentWithTab } from '@codemirror/commands';
import { oneDark } from '@codemirror/theme-one-dark';

// Language packages
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { php } from '@codemirror/lang-php';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { sql } from '@codemirror/lang-sql';
import { markdown } from '@codemirror/lang-markdown';

/**
 * Custom theme definitions
 */
const draculaTheme = EditorView.theme(
	{
		'&': {
			color: '#f8f8f2',
			backgroundColor: '#282a36',
		},
		'.cm-content': {
			caretColor: '#f8f8f0',
		},
		'&.cm-focused .cm-cursor': {
			borderLeftColor: '#f8f8f0',
		},
		'&.cm-focused .cm-selectionBackground, ::selection': {
			backgroundColor: '#44475a',
		},
		'.cm-gutters': {
			backgroundColor: '#282a36',
			color: '#6272a4',
			borderRight: '1px solid #44475a',
		},
		'.cm-activeLine': {
			backgroundColor: '#343746',
		},
		'.cm-activeLineGutter': {
			backgroundColor: '#343746',
			color: '#f8f8f2',
		},
	},
	{ dark: true }
);

const solarizedTheme = EditorView.theme(
	{
		'&': {
			color: '#839496',
			backgroundColor: '#002b36',
		},
		'.cm-content': {
			caretColor: '#93a1a1',
		},
		'&.cm-focused .cm-cursor': {
			borderLeftColor: '#93a1a1',
		},
		'&.cm-focused .cm-selectionBackground, ::selection': {
			backgroundColor: '#073642',
		},
		'.cm-gutters': {
			backgroundColor: '#002b36',
			color: '#586e75',
			borderRight: '1px solid #073642',
		},
		'.cm-activeLine': {
			backgroundColor: '#073642',
		},
		'.cm-activeLineGutter': {
			backgroundColor: '#073642',
			color: '#93a1a1',
		},
	},
	{ dark: true }
);

const nordTheme = EditorView.theme(
	{
		'&': {
			color: '#d8dee9',
			backgroundColor: '#2e3440',
		},
		'.cm-content': {
			caretColor: '#88c0d0',
		},
		'&.cm-focused .cm-cursor': {
			borderLeftColor: '#88c0d0',
		},
		'&.cm-focused .cm-selectionBackground, ::selection': {
			backgroundColor: '#434c5e',
		},
		'.cm-gutters': {
			backgroundColor: '#2e3440',
			color: '#4c566a',
			borderRight: '1px solid #3b4252',
		},
		'.cm-activeLine': {
			backgroundColor: '#3b4252',
		},
		'.cm-activeLineGutter': {
			backgroundColor: '#3b4252',
			color: '#eceff4',
		},
	},
	{ dark: true }
);

/**
 * Returns the appropriate CodeMirror language extension
 *
 * @param {string} lang
 * @return {Array|object} Extension
 */
function getLanguageExtension(lang) {
	switch (lang) {
		case 'python':
			return python();
		case 'php':
			return php();
		case 'html':
			return html();
		case 'css':
			return css();
		case 'sql':
			return sql();
		case 'markdown':
			return markdown();
		case 'javascript':
		default:
			return javascript();
	}
}

/**
 * Returns the appropriate CodeMirror theme extension
 *
 * @param {string} themeName
 * @return {Array|object} Extension
 */
function getThemeExtension(themeName) {
	switch (themeName) {
		case 'one-dark':
			return oneDark;
		case 'dracula':
			return draculaTheme;
		case 'solarized':
			return solarizedTheme;
		case 'nord':
			return nordTheme;
		case 'default':
		default:
			return [];
	}
}

/**
 * Available languages list
 */
const LANGUAGE_OPTIONS = [
	{ label: 'JavaScript', value: 'javascript' },
	{ label: 'Python', value: 'python' },
	{ label: 'PHP', value: 'php' },
	{ label: 'HTML / XML', value: 'html' },
	{ label: 'CSS', value: 'css' },
	{ label: 'SQL', value: 'sql' },
	{ label: 'Markdown', value: 'markdown' },
];

/**
 * Available themes list
 */
const THEME_OPTIONS = [
	{ label: 'Default (Light)', value: 'default' },
	{ label: 'One Dark', value: 'one-dark' },
	{ label: 'Dracula', value: 'dracula' },
	{ label: 'Solarized Dark', value: 'solarized' },
	{ label: 'Nord', value: 'nord' },
];

/**
 * Edit Component
 */
export default function Edit({ attributes, setAttributes }) {
	const { code, language, theme } = attributes;
	const editorRef = useRef(null);
	const viewRef = useRef(null);

	// Dedicated compartments for dynamic runtime reconfiguration without recreating view
	const langCompartment = useRef(new Compartment());
	const themeCompartment = useRef(new Compartment());

	// Initialize CodeMirror instance safely inside the component lifecycle
	useEffect(() => {
		if (!editorRef.current) {
			return;
		}

		// Initial editor state
		const startState = EditorState.create({
			doc: code || '',
			extensions: [
				basicSetup,
				keymap.of([...defaultKeymap, indentWithTab]),
				langCompartment.current.of(getLanguageExtension(language)),
				themeCompartment.current.of(getThemeExtension(theme)),
				EditorView.updateListener.of((update) => {
					if (update.docChanged) {
						const newCode = update.state.doc.toString();
						setAttributes({ code: newCode });
					}
				}),
				EditorView.theme({
					'&': {
						height: 'auto',
						minHeight: '160px',
						fontSize: '14px',
						fontFamily:
							'Consolas, "Fira Code", "JetBrains Mono", Menlo, Monaco, monospace',
					},
					'.cm-scroller': {
						overflow: 'auto',
						minHeight: '160px',
						lineHeight: '1.6',
					},
				}),
			],
		});

		// Create EditorView
		const view = new EditorView({
			state: startState,
			parent: editorRef.current,
		});

		viewRef.current = view;

		// Memory Leak Prevention: strictly destroy view on component unmount
		return () => {
			if (viewRef.current) {
				viewRef.current.destroy();
				viewRef.current = null;
			}
		};
	}, []); // Run only on mount and unmount

	// Reconfigure language extension when attribute changes without destroying the editor
	useEffect(() => {
		if (viewRef.current) {
			viewRef.current.dispatch({
				effects: langCompartment.current.reconfigure(
					getLanguageExtension(language)
				),
			});
		}
	}, [language]);

	// Reconfigure theme extension when attribute changes without destroying the editor
	useEffect(() => {
		if (viewRef.current) {
			viewRef.current.dispatch({
				effects: themeCompartment.current.reconfigure(
					getThemeExtension(theme)
				),
			});
		}
	}, [theme]);

	// Keep code in sync if external changes occur (e.g. undo/redo from Gutenberg history)
	useEffect(() => {
		if (viewRef.current) {
			const currentDoc = viewRef.current.state.doc.toString();
			if (code !== currentDoc) {
				viewRef.current.dispatch({
					changes: {
						from: 0,
						to: currentDoc.length,
						insert: code || '',
					},
				});
			}
		}
	}, [code]);

	const blockProps = useBlockProps({
		className: `custom-codemirror-block-editor theme-${theme}`,
	});

	// Quick stats for developer display
	const lineCount = code ? code.split('\n').length : 0;
	const charCount = code ? code.length : 0;

	return (
		<div {...blockProps}>
			<InspectorControls>
				<PanelBody
					title={__('Configurações do CodeMirror', 'wp-codemirror-block')}
					initialOpen={true}
				>
					<SelectControl
						label={__('Selecione a linguagem', 'wp-codemirror-block')}
						help={__(
							'Define a sintaxe e o realce de cores correspondente ao código inserido.',
							'wp-codemirror-block'
						)}
						value={language}
						options={LANGUAGE_OPTIONS}
						onChange={(newLang) =>
							setAttributes({ language: newLang })
						}
					/>
					<SelectControl
						label={__('Tema de formatação', 'wp-codemirror-block')}
						help={__(
							'Escolha o esquema de cores para o editor e a exibição no site.',
							'wp-codemirror-block'
						)}
						value={theme}
						options={THEME_OPTIONS}
						onChange={(newTheme) =>
							setAttributes({ theme: newTheme })
						}
					/>
					<PanelRow className="custom-codemirror-meta-row">
						<span className="components-base-control__label">
							{__('Estatísticas:', 'wp-codemirror-block')}
						</span>
						<span className="custom-codemirror-stats-badge">
							{lineCount} {lineCount === 1 ? 'linha' : 'linhas'} | {charCount} chars
						</span>
					</PanelRow>
				</PanelBody>
			</InspectorControls>

			<div className="custom-codemirror-header">
				<div className="custom-codemirror-window-dots" aria-hidden="true">
					<span className="dot dot-red" />
					<span className="dot dot-yellow" />
					<span className="dot dot-green" />
				</div>
				<div className="custom-codemirror-header-center">
					<span className="custom-codemirror-title">CodeMirror Editor Pro</span>
				</div>
				<div className="custom-codemirror-header-right">
					<span className="custom-codemirror-language-badge">
						{language.toUpperCase()}
					</span>
					<span className="custom-codemirror-theme-badge">
						{theme}
					</span>
				</div>
			</div>

			<div className="custom-codemirror-editor-wrapper" ref={editorRef} />

			{(!code || code.trim() === '') && (
				<div className="custom-codemirror-empty-notice">
					<small>
						{__(
							'Clique acima para começar a digitar seu código...',
							'wp-codemirror-block'
						)}
					</small>
				</div>
			)}
		</div>
	);
}
