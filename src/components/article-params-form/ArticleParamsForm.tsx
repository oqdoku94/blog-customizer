import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { FC, SyntheticEvent, useRef, useState, MouseEvent } from 'react';
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
import clsx from 'clsx';
import { useOutsideClickClose } from 'components/select/hooks/useOutsideClickClose';

interface ArticleParamsFormProps {
	setArticleState: (state: ArticleStateType) => void;
}

export const ArticleParamsForm: FC<ArticleParamsFormProps> = ({
	setArticleState,
}) => {
	const { isOpen, setOpen, toggle } = useDisclosure();
	const [settingsState, setSettingsState] =
		useState<ArticleStateType>(defaultArticleState);
	const rootRef = useRef<HTMLDivElement | null>(null);
	useOutsideClickClose({
		isOpen,
		rootRef,
		onChange: (value: boolean) => setOpen(value),
	});

	const handleOnSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		setArticleState(settingsState);
	};

	const handleOnReset = (e: SyntheticEvent) => {
		e.preventDefault();
		setSettingsState(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	const handleOnChange = (field: keyof ArticleStateType) => {
		return (value: OptionType) => {
			setSettingsState((prevState) => ({ ...prevState, [field]: value }));
		};
	};

	const handleOnClickArrow = (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		toggle();
	};

	return (
		<>
			<ArrowButton onClick={handleOnClickArrow} isOpen={isOpen} />
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}
				ref={rootRef}>
				<form
					className={styles.form}
					onSubmit={handleOnSubmit}
					onReset={handleOnReset}>
					<Text weight={800} size={31} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						selected={settingsState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleOnChange('fontFamilyOption')}
						title={'шрифт'}
					/>
					<RadioGroup
						name={'fontSize'}
						options={fontSizeOptions}
						selected={settingsState.fontSizeOption}
						title={'размер шрифта'}
						onChange={handleOnChange('fontSizeOption')}></RadioGroup>
					<Select
						selected={settingsState.fontColor}
						options={fontColors}
						onChange={handleOnChange('fontColor')}
						title={'цвет шрифта'}
					/>
					<Separator></Separator>
					<Select
						selected={settingsState.backgroundColor}
						options={backgroundColors}
						onChange={handleOnChange('backgroundColor')}
						title={'цвет фона'}
					/>
					<Select
						selected={settingsState.contentWidth}
						options={contentWidthArr}
						onChange={handleOnChange('contentWidth')}
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
