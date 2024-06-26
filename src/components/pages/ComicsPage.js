import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
const ComicsPage = () => {
	return (
		<>
			<ErrorBoundary>
				<AppBanner />
				<ComicsList />
			</ErrorBoundary>

		</>
	)
}

export default ComicsPage;