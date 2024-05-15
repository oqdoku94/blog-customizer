import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import cn from 'classnames';

import styles from './ArticleParamsForm.module.scss';
import { FC, SyntheticEvent, useState } from 'react';
import { Select } from 'components/select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'components/radio-group';
import { Separator } from 'components/separator';
import { useDisclosure } from 'components/hooks/useDisclosure';
import { Text } from 'components/text';

interface ArticleParamsFormProps {
	setArticleState: (state: ArticleStateType) => void;
	articleState: ArticleStateType;
}

export const ArticleParamsForm: FC<ArticleParamsFormProps> = (props) => {
	const { isOpen, toggle } = useDisclosure();
	const [settingsState, setSettingsState] = useState<ArticleStateType>(
		props.articleState
	);

	const onSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		props.setArticleState(settingsState);
	};

	const onReset = (e: SyntheticEvent) => {
		e.preventDefault();
		setSettingsState(defaultArticleState);
		props.setArticleState(defaultArticleState);
	};

	const setFontFamilyOptions = (opt: OptionType) =>
		setSettingsState({ ...settingsState, fontFamilyOption: opt });
	const setFontSizeOptions = (opt: OptionType) =>
		setSettingsState({ ...settingsState, fontSizeOption: opt });
	const setFontColorOptions = (opt: OptionType) =>
		setSettingsState({ ...settingsState, fontColor: opt });
	const setBackgroundColorOptions = (opt: OptionType) =>
		setSettingsState({ ...settingsState, backgroundColor: opt });
	const setContentWidthOptions = (opt: OptionType) =>
		setSettingsState({ ...settingsState, contentWidth: opt });

	return (
		<>
			<ArrowButton onClick={toggle} isOpen={isOpen} />
			<aside className={cn(styles.container, isOpen && styles.container_open)}>
				<form className={styles.form} onSubmit={onSubmit} onReset={onReset}>
					<Text weight={800} size={31} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						selected={settingsState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={setFontFamilyOptions}
						title={'шрифт'}
					/>
					<RadioGroup
						name={'fontSize'}
						options={fontSizeOptions}
						selected={settingsState.fontSizeOption}
						title={'размер шрифта'}
						onChange={setFontSizeOptions}></RadioGroup>
					<Select
						selected={settingsState.fontColor}
						options={fontColors}
						onChange={setFontColorOptions}
						title={'цвет шрифта'}
					/>
					<Separator></Separator>
					<Select
						selected={settingsState.backgroundColor}
						options={backgroundColors}
						onChange={setBackgroundColorOptions}
						title={'цвет фона'}
					/>
					<Select
						selected={settingsState.contentWidth}
						options={contentWidthArr}
						onChange={setContentWidthOptions}
						title={'ширина контента'}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
